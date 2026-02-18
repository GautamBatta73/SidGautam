function parser(tokens) {
    let pos = 0;

    function peek() {
        return tokens[pos];
    }

    function consume() {
        return tokens[pos++];
    }

    function expect(value) {
        const token = consume();
        if (!token || token.value !== value) {
            throw new Error(`Expected '${value ?? ""}'\nGot '${token?.value}', at line: ${token?.line} and column: ${token?.column}`);
        }
    }

    // --------------------
    // Precedence
    // --------------------
    const PRECEDENCE = {
        ".": 100,
        "?.": 100,
        "?[": 100,
        "(": 90,
        "[": 40,
        "*": 20,
        "%": 20,
        "/": 20,
        "+": 10,
        "-": 10,

        "<": 7,
        ">": 7,
        "<=": 7,
        ">=": 7,

        "==": 5,
        "!=": 5,

        "&&": 3,
        "||": 2,
        "??": 1.5,

        "=": 1,
        "+=": 1,
        "-=": 1,
        "*=": 1,
        "/=": 1,
        "%=": 1
    };

    const UNARY_PRECEDENCE = 30;

    function getPrecedence(token) {
        if (!token) return 0;
        if (token.value === "(") return PRECEDENCE["("];
        if (token.value === "[") return PRECEDENCE["["];
        return PRECEDENCE[token.value] || 0;
    }

    // --------------------
    // Pratt Expression
    // --------------------
    function parseExpression(rbp = 0) {
        const next = peek();
        if ((!next || next.value === ")" || next.value === ";" || next.value === "}") && next.type !== "STRING") {
            throw new Error(`Unexpected expression terminator: ${next?.value}, at line: ${next?.line} and column: ${next?.column}`);
        }

        let token = consume();
        let left = nud(token);

        while (rbp < getPrecedence(peek())) {
            token = consume();
            left = led(token, left);
        }

        return left;
    }

    function endsWithBlock(node) {
        return (
            node.type === "LambdaExpression" &&
            Array.isArray(node.body)
        );
    }

    function parseForStatement() {
        consume(); // 'for'
        expect("(");

        // --- init ---
        let init = null;
        if (peek().value !== ",") {
            if (peek().value === "var") {
                init = parseVarDeclaration(false);
                consume();
            } else {
                init = parseExpression();
                expect(",");
            }
        } else {
            expect(",");
        }

        // --- condition ---
        let test = null;
        if (peek().value !== ",") {
            test = parseExpression();
        }
        expect(",");

        // --- update ---
        let update = null;
        if (peek().value !== ")") {
            update = parseExpression();
        }
        expect(")");

        const body = parseBlock();

        return {
            type: "ForStatement",
            init,
            test,
            update,
            body
        };
    }

    // --------------------
    // NUD (prefix)
    // --------------------
    function nud(token) {
        function isLambdaAhead() {
            let temp = pos; // current token is just after '('
            let parens = 1;

            while (temp < tokens.length && parens > 0) {
                const t = tokens[temp++];
                if (t.value === "(") parens++;
                else if (t.value === ")") parens--;
            }

            // After closing ')', check if the next token is '=>'
            if (temp < tokens.length && tokens[temp].type === "ARROW") {
                return true;
            }

            return false;
        }

        switch (token.type) {
            case "NUMBER":
                return {
                    type: "NumberLiteral",
                    value: Number(token.value),
                    loc: { line: token.line, column: token.column }
                };

            case "IDENT": {
                let node = {
                    type: "Identifier",
                    name: token.value,
                    loc: { line: token.line, column: token.column }
                };

                return node;
            }

            case "OPERATOR":
                if ("+-!".includes(token.value)) {
                    return {
                        type: "UnaryExpression",
                        operator: token.value,
                        argument: parseExpression(UNARY_PRECEDENCE),
                        loc: { line: token.line, column: token.column }
                    };
                }
                break;

            case "PUNCT": {
                if (token.value === "{") {
                    const elements = [];
                    const properties = [];

                    if (peek().value !== "}") {
                        do {
                            const first = parseExpression();

                            if (peek().value === ":") {
                                // Object property
                                consume(); // :
                                const value = parseExpression();
                                properties.push({ key: first, value });
                            } else {
                                // Array element
                                elements.push(first);
                            }
                        } while (peek().value === "," && consume());
                    }

                    expect("}");

                    return properties.length
                        ? { type: "ObjectLiteral", properties }
                        : { type: "ArrayLiteral", elements };
                }

                /* ---------- ( ) : Grouping or Lambda ---------- */
                if (token.value === "(") {
                    if (isLambdaAhead()) {
                        return parseLambda();
                    }

                    if (peek().value === ")") {
                        throw new Error(
                            `Empty grouping '()' is not allowed, at line: ${token.line}, column: ${token.column}`
                        );
                    }

                    const expr = parseExpression();
                    expect(")");
                    return expr;
                }

                break;
            }

            case "STRING":
                return {
                    type: "StringLiteral",
                    value: token.value,
                    loc: { line: token.line, column: token.column }
                };

            case "TEMPLATE": {
                const parts = token.parts.map(part => {
                    if (part.type === "text") {
                        return {
                            type: "StringLiteral",
                            value: part.value
                        };
                    }

                    // Parse embedded expression
                    const exprParser = require("./parser");
                    const ast = exprParser(part.tokens);

                    if (ast.body.length !== 1 ||
                        ast.body[0].type !== "ExpressionStatement") {
                        throw new Error("Invalid template expression");
                    }

                    return {
                        type: "TemplateExpression",
                        expression: ast.body[0].expression
                    };
                });

                return {
                    type: "TemplateLiteral",
                    parts,
                    loc: { line: token.line, column: token.column }
                };
            }
        }

        throw new Error(`Unexpected token: ${token.value}, at line: ${token.line} and column: ${token.column}`);
    }

    // --------------------
    // LED (infix)
    // --------------------
    function led(token, left) {
        if (token.value === "(") {
            const args = [];

            if (peek().value !== ")") {
                do {
                    args.push(parseExpression());
                } while (peek().value === "," && consume());
            }

            expect(")");

            return {
                type: "CallExpression",
                callee: left,
                arguments: args,
                loc: left.loc
            };
        }
        if (token.value === "?." || token.value === "?[") {
            if (token.value === "?[") {
                const index = parseExpression();
                expect("]");

                return {
                    type: "OptionalChainExpression",
                    object: left,
                    property: index,
                    computed: true,
                    loc: { line: token.line, column: token.column }
                };
            }

            const prop = consume();

            if (prop.type !== "IDENT") {
                throw new Error("Expected property after ?.");
            }

            return {
                type: "OptionalChainExpression",
                object: left,
                property: {
                    type: "StringLiteral",
                    value: prop.value
                },
                loc: { line: token.line, column: token.column }
            };
        }
        if (token.value === ".") {
            const prop = consume();

            if (prop.type !== "IDENT") {
                throw new Error("Expected property name after '.'");
            }

            return {
                type: "IndexExpression",
                object: left,
                index: {
                    type: "StringLiteral",
                    value: prop.value
                },
                loc: { line: token.line, column: token.column }
            };
        }
        if (token.value === "[") {
            const index = parseExpression();
            expect("]");

            return {
                type: "IndexExpression",
                object: left,
                index,
                loc: { line: token.line, column: token.column }
            };
        }

        // Assignment (right-associative)
        if (token.value === "=" ||
            token.value === "+=" ||
            token.value === "-=" ||
            token.value === "*=" ||
            token.value === "/=" ||
            token.value === "%="
        ) {
            if (left.type !== "Identifier" && left.type !== "IndexExpression") {
                throw new Error(`Invalid assignment target, at line: ${left.loc?.line} and column: ${left.loc?.column}`);
            }

            return {
                type: "AssignmentExpression",
                operator: token.value,
                left,
                right: parseExpression(PRECEDENCE[token.value] - 1)
            };
        }

        if (token.value === "??") {
            return {
                type: "NullishExpression",
                left,
                right: parseExpression(PRECEDENCE["??"]),
                loc: left.loc
            };
        }

        // All other binary operators (left-associative)
        if (token.type === "OPERATOR") {
            return {
                type: "BinaryExpression",
                operator: token.value,
                left,
                right: parseExpression(PRECEDENCE[token.value]),
                loc: left.loc
            };
        }

        throw new Error(`Unknown operator: ${token.value}, at line: ${token.line} and column: ${token.column}`);
    }


    // --------------------
    // Statements
    // --------------------
    function parseVarDeclaration(notFor = true) {
        consume(); // 'let'
        const identity = consume();
        const name = identity.value
        expect("=");
        const value = parseExpression();
        if (notFor) expect(";");

        return {
            type: "VarDeclaration",
            name,
            value,
            loc: { line: identity.line, column: identity.column }
        };
    }

    function parseConstDeclaration() {
        consume(); // 'let'
        const identity = consume();
        const name = identity.value
        expect("=");
        const value = parseExpression();
        expect(";");

        return {
            type: "ConstDeclaration",
            name,
            value,
            loc: { line: identity.line, column: identity.column }
        };
    }

    function parseStatement() {
        if (peek().value === "import") {
            return parseImportDeclaration();
        }

        if (peek().value === "var") {
            return parseVarDeclaration();
        }

        if (peek().value === "final") {
            return parseConstDeclaration();
        }

        if (peek().value === "unless") {
            return parseIfStatement();
        }

        if (peek().value === "though") {
            return parseWhileStatement();
        }

        if (peek().value === "until") {
            return parseForStatement();
        }

        if (peek().value === "func") {
            return parseFunctionDeclaration();
        }

        if (peek().value === "pass") {
            return parseReturnStatement();
        }

        const expr = parseExpression();
        if (!endsWithBlock(expr)) {
            expect(";");
        }
        return {
            type: "ExpressionStatement",
            expression: expr
        };
    }

    function parseBlock() {
        expect("{");
        const body = [];
        while (peek().value !== "}") {
            body.push(parseStatement());
        }
        expect("}");
        return body;
    }

    function parseReturnStatement() {
        consume(); // 'return'
        const argument = parseExpression();
        expect(";");
        return {
            type: "ReturnStatement",
            argument
        };
    }

    function parseIfStatement() {
        consume(); // 'if'
        expect("(");
        const test = parseExpression();
        expect(")");

        const consequent = parseBlock();

        let alternate = null;
        if (peek() && peek().value === "orElse") {
            consume(); // 'else'
            alternate = parseBlock();
        }

        return {
            type: "IfStatement",
            test,
            consequent,
            alternate,
            loc: test.loc
        };
    }

    function parseWhileStatement() {
        consume(); // 'while'
        expect("(");
        const test = parseExpression();
        expect(")");
        const body = parseBlock();
        return {
            type: "WhileStatement",
            test,
            body,
            loc: test.loc
        };
    }

    function parseFunctionDeclaration() {
        consume(); // 'function'
        const identity = consume();
        const name = identity.value; // function name (IDENT)
        expect("(");

        const params = [];
        if (peek().value !== ")") {
            do {
                params.push(consume().value); // IDENT
            } while (peek().value === "," && consume());
        }

        expect(")");
        const body = parseBlock();

        return {
            type: "FunctionDeclaration",
            name,
            params,
            body,
            loc: { line: identity.line, column: identity.column }
        };
    }

    function parseImportDeclaration() {
        consume(); // import

        const tok = consume();
        if (tok.type !== "STRING") {
            throw new Error("Expected string literal in import");
        }

        expect(";");

        return {
            type: "ImportDeclaration",
            source: tok.value
        };
    }

    function parseLambda() {
        const params = [];

        // We are already inside '(' ... ')'
        if (peek().value !== ")") {
            do {
                const tok = consume();
                if (tok.type !== "IDENT") {
                    throw new Error(`Invalid lambda parameter, at line: ${tok.line} and column: ${tok.column}`);
                }
                params.push(tok.value);
            } while (peek().value === "," && consume());
        }

        expect(")");   // closes parameter list
        expect("->");

        // BLOCK lambda
        if (peek().value === "{") {
            const body = parseBlock();
            return {
                type: "LambdaExpression",
                params,
                body,
                loc: body[0].loc
            };
        }

        // EXPRESSION lambda
        const body = parseExpression();
        return {
            type: "LambdaExpression",
            params,
            body,
            loc: body.loc
        };
    }

    // --------------------
    // Program
    // --------------------
    const ast = {
        type: "Program",
        body: []
    };

    while (pos < tokens.length) {
        ast.body.push(parseStatement());
    }

    return ast;
}

module.exports = parser;
