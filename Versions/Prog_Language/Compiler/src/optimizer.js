function fold(node) {
    if (!node || typeof node !== "object") return node;

    switch (node.type) {
        case "BinaryExpression": {
            const left = fold(node.left);
            const right = fold(node.right);

            // Fold numeric + string ops
            if ((right.value === 0 || right.name === "false") && node.operator === "/") {
                throw new Error(`Dividing by zero/false?, at line: ${node.loc?.line}, column: ${node.loc?.column}`);
            } else if (left.name === "NULL" || right.name === "NULL") {
                return left.name === "NULL" ? left : right;
            } else if ((left.name === "true" || right.name === "true") ||
                (left.name === "false" || right.name === "false")) {
                let boolLeft = left.name === "true" ? true : false;
                let boolRight = right.name === "true" ? true : false;
                let value = eval(`${boolLeft} ${node.operator} ${boolRight}`) || 0;
                return {
                    type: "NumberLiteral",
                    value
                };
            }
            if (
                left.type === "NumberLiteral" &&
                right.type === "NumberLiteral"
            ) {
                let value = eval(`${left.value} ${node.operator} ${right.value}`) || 0;
                return {
                    type: "NumberLiteral",
                    value
                };
            }

            if (left.type === "StringLiteral" && right.type === "StringLiteral") {
                if (node.operator === "+") {
                    let value = `${left.value}${right.value}`;
                    return {
                        type: "StringLiteral",
                        value
                    };
                }
            } else if ((left.type === "StringLiteral" ^ right.type === "StringLiteral") &&
                (left.type === "NumberLiteral" ^ right.type === "NumberLiteral")) {
                if (node.operator === "+") {
                    let value = `${left.value}${right.value}`;
                    return {
                        type: "StringLiteral",
                        value
                    };
                } else if (node.operator === "-") {
                    let value = "";
                    if (left.type === "StringLiteral") {
                        if (right.value <= 0) value = left.value;
                        else value = left.value.slice(0, -(right.value));
                    } else {
                        if (left.value <= 0) value = right.value;
                        else value = right.value.slice(left.value);
                    }
                    return {
                        type: "StringLiteral",
                        value
                    };
                } else if (node.operator === "*") {
                    let num = (left.type === "NumberLiteral") ? left.value : right.value;
                    let str = (left.type === "StringLiteral") ? left.value : right.value;
                    let value = "";

                    if (num > 0) value = str.repeat(num);
                    return {
                        type: "StringLiteral",
                        value
                    };
                } else if (node.operator === "/") {
                    let value = "";
                    if (left.type === "StringLiteral") {
                        if (right.value <= 0) value = left.value;
                        else value = left.value.slice(left.value.length / right.value, left.value.length);
                    } else {
                        if (left.value <= 0) value = right.value;
                        else value = right.value.slice(0, right.value.length / left.value);
                    }
                    return {
                        type: "StringLiteral",
                        value
                    };
                }
            }

            return { ...node, left, right };
        }

        case "AssignmentExpression": {
            const left = fold(node.left);
            const right = fold(node.right);

            if ((right.value === 0 || right.name === "false") && node.operator === "/=") {
                throw new Error(`Dividing by zero/false?, at line: ${right.loc?.line}, column: ${right.loc?.column}`);
            } else if (right.name === "NULL") {
                return {
                    ...node,
                    operator: "=",
                    left,
                    right
                };
            }

            return {
                ...node,
                left,
                right
            };
        }

        case "NullishExpression": {
            const left = fold(node.left);
            const right = fold(node.right);

            // NULL ?? x  → x
            if (left.type === "Identifier" && (left.name === "NULL")) {
                return right;
            }

            // Literal ?? x
            if (left.type === "StringLiteral" || left.type === "NumberLiteral") {
                return left;
            }

            return { ...node, left, right };
        }

        case "LambdaExpression":
            return {
                ...node,
                body: Array.isArray(node.body) ? node.body.map(fold) : fold(node.body)
            };

        case "UnaryExpression": case "ReturnStatement":
            return {
                ...node,
                argument: fold(node.argument)
            };

        case "ExpressionStatement":
            return {
                ...node,
                expression: fold(node.expression)
            };

        case "IfStatement":
            return {
                ...node,
                alternate: node.alternate?.map(fold),
                consequent: node.consequent.map(fold),
                test: fold(node.test)
            };

        case "WhileStatement":
            return {
                ...node,
                body: node.body.map(fold),
                test: fold(node.test)
            };

        case "ForStatement":
            return {
                ...node,
                body: node.body.map(fold),
                init: fold(node.init),
                test: fold(node.test),
                update: fold(node.update)
            };

        case "IndexExpression":
            return {
                ...node,
                object: fold(node.object),
                index: fold(node.index)
            };

        case "CallExpression":
            return {
                ...node,
                callee: fold(node.callee),
                arguments: node.arguments.map(fold)
            };

        case "VarDeclaration": case "ConstDeclaration":
            return {
                ...node,
                value: fold(node.value)
            };

        case "Program": case "FunctionDeclaration":
            return {
                ...node,
                body: node.body.map(fold)
            };

        //DataTypes:
        //StringLiteral
        //NumberLiteral
        //NULL
        //Boolean
        case "ObjectLiteral":
            return {
                ...node,
                properties: node.properties.map(p => ({
                    key: fold(p.key),
                    value: fold(p.value)
                }))
            };

        case "ArrayLiteral":
            return {
                ...node,
                elements: node.elements.map(fold)
            };

        default:
            return node;
    }
}

module.exports = fold;