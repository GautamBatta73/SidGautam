const TOKEN_TYPES = {
    NUMBER: "NUMBER",
    IDENT: "IDENT",
    KEYWORD: "KEYWORD",
    OPERATOR: "OPERATOR",
    PUNCT: "PUNCT",
    ARROW: "ARROW",
    STRING: "STRING",
    TEMPLATE: "TEMPLATE"
};

const keywords = new Set(["final", "var", "unless", "orElse", "though", "func", "pass", "until", "import"]);

function lexer(input) {
    let i = 0;
    const tokens = [];
    let line = 1;
    let column = 1;

    while (i < input.length) {
        const char = input[i];

        if (char === "\n") {
            line++;
            column = 1;
        } else {
            column++;
        }

        if (char === "#" && input[i + 1] === " ") {
            let current = char;
            while (current && current !== "\n") {
                current = input[i++];
            }
            continue;
        }

        if (/\s/.test(char)) {
            i++;
            continue;
        }

        // Numbers
        if (/\d/.test(char)) {
            let num = "";
            let hasDot = false;

            while (i < input.length) {
                const c = input[i];

                if (/\d/.test(c)) {
                    num += c;
                    i++;
                } else if (c === "." && !hasDot) {
                    hasDot = true;
                    num += c;
                    i++;
                } else {
                    break;
                }
            }

            tokens.push({
                type: TOKEN_TYPES.NUMBER,
                value: num,
                line,
                column
            });
            continue;
        }

        // Identifiers / keywords
        if (/[a-z_]/i.test(char)) {
            let ident = "";
            while (/[a-z0-9_]/i.test(input[i] ?? "\n")) {
                ident += input[i++];
            }
            tokens.push({
                type: keywords.has(ident) ? TOKEN_TYPES.KEYWORD : TOKEN_TYPES.IDENT,
                value: ident, line, column
            });
            continue;
        }

        if (char === "-" && input[i + 1] === ">") {
            i += 2;
            tokens.push({ type: TOKEN_TYPES.ARROW, value: "->", line, column });
            continue;
        }

        // Operators
        if ("=+-*%/!<>|&?".includes(char)) {
            let op = char;
            i++;

            // Two-character operators
            if (
                (op === "=" || op === "!" || op === "<" || op === ">") &&
                input[i] === "="
            ) {
                op += input[i++];
            } else if ((op === "&" && input[i] === "&") ||
                (op === "|" && input[i] === "|")) {
                op += input[i++];
            } else if (
                op === "?" &&
                (input[i] === "?" || input[i] === "." || input[i] === "[")
            ) {
                op += input[i++];
            }

            tokens.push({
                type: TOKEN_TYPES.OPERATOR,
                value: op, line, column
            });
            continue;
        }

        // Template literals
        if (char === "'") {
            const parts = [];
            let text = "";
            i++; // skip opening '

            while (i < input.length) {
                if (input[i] === "'") {
                    if (text) {
                        parts.push({ type: "text", value: text });
                    }
                    i++; // skip closing '
                    break;
                }

                // Expression start
                if (input[i] === "{") {
                    if (text) {
                        parts.push({ type: "text", value: text });
                        text = "";
                    }

                    i++; // skip {
                    let depth = 1;
                    let expr = "";

                    while (i < input.length && depth > 0) {
                        if (input[i] === "{") depth++;
                        else if (input[i] === "}") depth--;

                        if (depth > 0) expr += input[i];
                        i++;
                    }

                    if (depth !== 0) {
                        throw new Error(`Unterminated template expression at line ${line}`);
                    }

                    // Re-lex the expression
                    const exprTokens = lexer(expr + ";");
                    parts.push({ type: "expr", tokens: exprTokens });
                    continue;
                }

                // Escape handling
                if (input[i] === "\\") {
                    const next = input[i + 1];
                    if (next === "n") {
                        text += "\n";
                        i += 2;
                        continue;
                    } else if (next === "'") {
                        text += '\'';
                        i += 2;
                        continue;
                    }
                    text += next;
                    i += 2;
                    continue;
                }

                text += input[i++];
            }

            tokens.push({
                type: TOKEN_TYPES.TEMPLATE,
                parts,
                line,
                column
            });

            continue;
        }

        // Strings
        if (char === '"') {
            let str = "";
            i++; // skip opening quote

            while (i < input.length && input[i] !== '"') {

                if (input[i] === "\n") {
                    throw new Error(`Unterminated string at line ${line}`);
                }

                // escape handling
                if (input[i] === "\\") {
                    const next = input[i + 1];

                    if (next === "n") {
                        str += "\n";
                        i += 2;
                        continue;
                    } else if (next === '"') {
                        str += "\"";
                        i += 2;
                        continue;
                    }

                    // Unknown escape (for now)
                    throw new Error(`Unknown escape sequence \\${next} at line ${line}`);
                }

                str += input[i++];
            }

            if (input[i] !== '"') {
                throw new Error(`Unterminated string at line ${line}`);
            }

            i++; // skip closing quote

            tokens.push({
                type: TOKEN_TYPES.STRING,
                value: str,
                line,
                column
            });

            continue;
        }

        // Punctuation
        if ("();{},[]:.".includes(char)) {
            tokens.push({ type: TOKEN_TYPES.PUNCT, value: char, line, column });
            i++;
            continue;
        }

        throw new Error(`Unexpected character: ${char}, at line: ${line} and column: ${column}`);
    }

    return tokens;
}

module.exports = lexer;
