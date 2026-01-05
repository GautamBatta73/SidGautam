function fold(node) {
    if (!node || typeof node !== "object") return node;

    switch (node.type) {
        case "BinaryExpression": {
            const left = fold(node.left);
            const right = fold(node.right);

            // Fold numeric + string ops
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

            if (
                ((left.type === "StringLiteral" &&
                    right.type === "StringLiteral") ||
                    (left.type === "NumberLiteral" &&
                        right.type === "StringLiteral") ||
                    (left.type === "StringLiteral" &&
                        right.type === "NumberLiteral")) &&
                node.operator === "+"
            ) {
                let value = `${left.value}${right.value}`;
                return {
                    type: "StringLiteral",
                    value
                };
            }

            return { ...node, left, right };
        }

        case "AssignmentExpression": {
            return {
                ...node,
                left: fold(node.left),
                right: fold(node.right)
            };
        }

        case "NullishExpression": {
            const left = fold(node.left);
            const right = fold(node.right);

            // NULL ?? x  → x
            if (left.type === "Identifier" && (left.name === "NULL" || left.name === "false")) {
                return right;
            }

            // Literal ?? x
            if (left.type === "StringLiteral" || left.type === "NumberLiteral" || left.name === "true") {
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