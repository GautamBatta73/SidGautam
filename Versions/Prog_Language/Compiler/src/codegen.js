const Op = require("./bytecode/bytecode");
const Chunk = require("./bytecode/chunk");

function compile(node, chunk) {
    switch (node.type) {
        case "Program":
            for (let i = 0; i < node.body.length; i++) {
                const stmt = node.body[i];

                const isLast = i === node.body.length - 1;

                if (stmt.type === "ExpressionStatement" && isLast) {
                    compile(stmt.expression, chunk);
                } else {
                    compile(stmt, chunk);
                }
            }
            break;


        case "NumberLiteral": case "StringLiteral": {
            const idx = chunk.addConst(node.value);
            chunk.emit(Op.PUSH_CONST, idx, node.loc);
            break;
        }

        case "ObjectLiteral": {
            chunk.emit(Op.NEW_OBJECT);

            for (const prop of node.properties) {
                chunk.emit(Op.DUP);

                // ---- FIX HERE ----
                if (prop.key.type === "Identifier") {
                    // Identifier keys become string literals
                    const keyIdx = chunk.addConst(prop.key.name);
                    chunk.emit(Op.PUSH_CONST, keyIdx, prop.key.loc);
                } else {
                    // Expressions like ["a"] or [x]
                    compile(prop.key, chunk);
                }
                // ------------------

                compile(prop.value, chunk);
                chunk.emit(Op.SET_PROP, null, prop.key.loc);
            }
            break;
        }

        case "ArrayLiteral": {
            // Compile each element in order
            for (const el of node.elements) {
                compile(el, chunk);
            }

            // Tell VM how many elements to pop
            chunk.emit(Op.MAKE_ARRAY, node.elements.length);
            break;
        }

        case "OptionalChainExpression": {
            // Evaluate object
            if (node.object.type === "Identifier") {
                chunk.emit(Op.LOAD_SAFE, node.object.name, node.object.loc);
            } else {
                compile(node.object, chunk);
            }

            // Duplicate for null check
            chunk.emit(Op.DUP);

            // If null → jump to end
            const jumpIfNull = chunk.code.length;
            chunk.emit(Op.JUMP_IF_NULL, null);

            // Access property
            compile(node.property, chunk);
            chunk.emit(Op.GET_INDEX, null, node.object.loc);

            // Patch jump
            chunk.code[jumpIfNull].arg = chunk.code.length;

            break;
        }

        case "AssignmentExpression": {
            // a = value
            if (node.left.type === "Identifier") {
                // compile RHS first (value is on stack)
                compile(node.right, chunk);

                // store into LHS variable
                chunk.emit(Op.STORE, node.left.name, node.left.loc);
                break;
            }

            // a[i] = value
            if (node.left.type === "IndexExpression") {
                // object
                compile(node.left.object, chunk);

                // index
                compile(node.left.index, chunk);

                // value
                compile(node.right, chunk);

                // perform write
                chunk.emit(Op.SET_INDEX, null, node.left.loc);
                break;
            }

            throw new Error(
                `Invalid assignment target, at line: ${node.left.loc?.line} and column: ${node.left.loc?.column}`
            );
        }

        case "VarDeclaration":
            compile(node.value, chunk);
            chunk.emit(Op.STORE, node.name, node.loc);
            break;

        case "ConstDeclaration":
            compile(node.value, chunk);
            chunk.emit(Op.STORE_CONST, node.name, node.loc);
            break;

        case "Identifier":
            chunk.emit(Op.LOAD, node.name, node.loc);
            break;

        case "ExpressionStatement":
            compile(node.expression, chunk);
            chunk.emit(Op.POP); // discard result
            break;

        case "ImportDeclaration": {
            const path = node.source;

            // Emit runtime import
            const constIdx = chunk.addConst(path);
            chunk.emit(Op.IMPORT, constIdx);
            break;
        }

        case "UnaryExpression": {
            compile(node.argument, chunk);

            switch (node.operator) {
                case "-":
                    chunk.emit(Op.NEG, null, node.loc);
                    break;
                case "!":
                    chunk.emit(Op.NOT, null, node.loc);
                    break;
                default:
                    throw new Error(`Unknown unary operator: ${node.operator}, at line: ${node.loc?.line} and column: ${node.loc?.column}`);
            }
            break;
        }

        case "BinaryExpression": {
            compile(node.left, chunk);
            compile(node.right, chunk);

            const map = {
                "+": Op.ADD,
                "-": Op.SUB,
                "*": Op.MUL,
                "/": Op.DIV,
                "<": Op.LT,
                ">": Op.GT,
                "<=": Op.LTE,
                ">=": Op.GTE,
                "==": Op.EQ,
                "!=": Op.NEQ,
                "&&": Op.AND,
                "||": Op.OR
            };

            const opcode = map[node.operator];
            if (!opcode) throw new Error(`Unknown binary operator: ${node.operator}, at line: ${node.loc?.line} and column: ${node.loc?.column}`);
            chunk.emit(opcode, null, node.loc);
            break;
        }

        case "IfStatement": {
            compile(node.test, chunk);

            // Placeholder jump to else or end
            const jumpIfTrueIdx = chunk.code.length;
            chunk.emit(Op.JUMP_IF_TRUE, null, node.loc);

            // Consequent
            for (const stmt of node.consequent) {
                compile(stmt, chunk);
            }

            // Jump over alternate if present
            let jumpOverElseIdx = null;
            if (node.alternate) {
                jumpOverElseIdx = chunk.code.length;
                chunk.emit(Op.JUMP, null, node.loc);
            }

            // Patch jumpIfTrue to here (start of else or end)
            chunk.code[jumpIfTrueIdx].arg = chunk.code.length;

            // Alternate
            if (node.alternate) {
                for (const stmt of node.alternate) {
                    compile(stmt, chunk);
                }
                // Patch jumpOverElse to after else block
                chunk.code[jumpOverElseIdx].arg = chunk.code.length;
            }

            break;
        }

        case "WhileStatement": {
            const loopStart = chunk.code.length; // start of loop

            // Compile the condition
            compile(node.test, chunk);

            // Jump out if false
            const jumpIfTrueIdx = chunk.code.length;
            chunk.emit(Op.JUMP_IF_TRUE, null, node.loc);

            // Compile the loop body
            for (const stmt of node.body) {
                compile(stmt, chunk);
            }

            // Jump back to start
            chunk.emit(Op.JUMP, loopStart, node.loc);

            // Patch the jump out address
            chunk.code[jumpIfTrueIdx].arg = chunk.code.length;

            break;
        }

        case "ForStatement": {
            // Compile initializer (runs once)
            if (node.init) compile(node.init, chunk);

            const loopStart = chunk.code.length; // start of loop

            // Compile test (if present)
            if (node.test) compile(node.test, chunk);

            // Jump out if false
            const jumpIfFalse = node.test ? chunk.code.length : null;
            if (node.test) chunk.emit(Op.JUMP_IF_FALSE, null, node.init.loc);

            // Compile body
            for (const stmt of node.body) {
                compile(stmt, chunk);
            }

            // Compile update (runs after body)
            if (node.update) compile(node.update, chunk);
            if (node.update) chunk.emit(Op.POP); // discard update result if needed

            // Jump back to start
            chunk.emit(Op.JUMP, loopStart, node.init.loc);

            // Patch exit jump
            if (node.test) chunk.code[jumpIfFalse].arg = chunk.code.length;

            break;
        }

        case "FunctionDeclaration": {
            const fnChunk = new Chunk();

            // Compile body
            for (const stmt of node.body) {
                compile(stmt, fnChunk);
            }

            // Ensure function returns undefined if no explicit pass
            fnChunk.emit(Op.PUSH_CONST, fnChunk.addConst(undefined), node.loc);
            fnChunk.emit(Op.RETURN, null, node.loc);

            // Create the function object
            const fnObj = {
                type: "Function",
                name: node.name,
                params: node.params,
                chunk: fnChunk
            };

            // Store function object in constants
            const fnConstIdx = chunk.addConst(fnObj);

            // Push function object onto stack
            chunk.emit(Op.PUSH_CONST, fnConstIdx, node.loc);

            // Store function in global variable
            chunk.emit(Op.STORE, node.name, node.loc);

            break;
        }

        case "LambdaExpression": {
            const fnChunk = new Chunk();

            // Compile body
            if (Array.isArray(node.body)) {
                // block lambda
                for (const stmt of node.body) {
                    compile(stmt, fnChunk);
                }
                fnChunk.emit(Op.PUSH_CONST, fnChunk.addConst(undefined), node.loc);
                fnChunk.emit(Op.RETURN, null, node.loc);
            } else {
                // single-expression lambda
                compile(node.body, fnChunk);
                fnChunk.emit(Op.RETURN, null, node.loc);
            }

            const fnObj = {
                type: "Function",
                name: null,
                params: node.params,
                chunk: fnChunk
            };

            const fnConstIdx = chunk.addConst(fnObj);

            // Push function object onto stack
            chunk.emit(Op.PUSH_CONST, fnConstIdx, node.loc);

            break;
        }

        case "ReturnStatement": {
            // Compile the return value expression
            compile(node.argument, chunk);
            chunk.emit(Op.RETURN);
            break;
        }

        case "IndexExpression": {
            // Evaluate object first
            compile(node.object, chunk);

            // Then index
            compile(node.index, chunk);

            // Read element
            chunk.emit(Op.GET_INDEX, null, node.loc);
            break;
        }

        case "NullishExpression": {
            // Evaluate left side
            compile(node.left, chunk);

            // Duplicate it for checking
            chunk.emit(Op.DUP, null, node.loc);

            // If NOT null, jump over RHS
            const jumpIfNotNull = chunk.code.length;
            chunk.emit(Op.JUMP_IF_NOT_NULL, null, node.loc);

            // Left was null → discard it
            chunk.emit(Op.POP);

            // Evaluate right side
            compile(node.right, chunk);

            // Patch jump target
            chunk.code[jumpIfNotNull].arg = chunk.code.length;

            break;
        }

        case "TemplateLiteral": {
            let first = true;

            for (const part of node.parts) {
                if (part.type === "StringLiteral") {
                    chunk.emit(Op.PUSH_CONST, chunk.addConst(part.value));
                } else {
                    compile(part.expression, chunk);
                    if (part.expression.type !== "StringLiteral") {
                        chunk.emit(Op.LOAD, "str");
                        chunk.emit(Op.CALL, 1);
                    }
                }

                if (!first) {
                    chunk.emit(Op.ADD);
                }
                first = false;
            }

            break;
        }

        case "CallExpression": {
            // Compile arguments first (they get pushed on the stack in order)
            for (const arg of node.arguments) {
                compile(arg, chunk);
            }

            // Compile the function reference itself
            compile(node.callee, chunk);

            // Emit CALL with argument count
            if (node.callee.type === "OptionalChainExpression")
                chunk.emit(Op.CALL_IF_NOT_NULL, node.arguments.length, node.loc);
            else
                chunk.emit(Op.CALL, node.arguments.length, node.loc);

            break;
        }

        default:
            throw new Error(`Unimplemented node type: ${node.type}, at line: ${node.loc?.line} and column: ${node.loc?.column}`);
    }
}

module.exports = compile;
