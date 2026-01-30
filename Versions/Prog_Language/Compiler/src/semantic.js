const builtins = [];
const builtinConst = ["this", "true", "false", "NULL", "print", "exit", "str", "int", "double", "trim", "__injs", "errPrint", "len", "isEmpty", "__addToPrototype", "dataType", "__ARGS", "Error", "catchError"]

function semantic(ast) {
  const progScope = new Set();
  const progConstants = new Set();

  function visit(node, scope, constants) {
    if (node) {
      if (node.type === "ExpressionStatement") {
        visit(node.expression, scope, constants);
      } else if (node.type === "VarDeclaration") {
        if (scope.has(node.name)) {
          throw new Error(`Variable ${node.name} redeclared, at line: ${node.loc?.line} and column: ${node.loc?.column}`);
        }
        if (builtins.includes(node.name) || builtinConst.includes(node.name)) {
          throw new Error(`${node.name} is a builtin var/constant.\nDo not redeclare, at line: ${node.loc?.line} and column: ${node.loc?.column}`);
        }
        scope.add(node.name);

        let varScope = new Set();
        let varConstants = new Set();
        visit(node.value, varScope, varConstants);
      } else if (node.type === "ConstDeclaration") {
        if (scope.has(node.name)) {
          throw new Error(`Constant ${node.name} redeclared, at line: ${node.loc?.line} and column: ${node.loc?.column}`);
        }
        if (builtins.includes(node.name) || builtinConst.includes(node.name)) {
          throw new Error(`${node.name} is a builtin var/constant.\n Do not redeclare, at line: ${node.loc?.line} and column: ${node.loc?.column}`);
        }
        scope.add(node.name);
        constants.add(node.name);

        let varScope = new Set();
        let varConstants = new Set();
        visit(node.value, varScope, varConstants);
      } else if (node.type === "ArrayLiteral") {
        let varScope = new Set(scope);
        let varConstants = new Set(constants);

        node.elements.forEach(e => visit(e, varScope, varConstants));
      } else if (node.type === "ObjectLiteral") {
        let varScope = new Set(scope);
        let varConstants = new Set(constants);

        node.properties.forEach(e => {
          visit(e.key, new Set(), new Set());
          visit(e.value, varScope, varConstants);
        });
      } else if (node.type === "AssignmentExpression") {
        if (builtinConst.includes(node.left.name) || builtinConst.includes(node.left.object?.name)) {
          throw new Error(`${node.left.name ?? node.left.object?.name} is a builtin constant.\nDo not reassign, at line: ${node.left.loc?.line} and column: ${node.left.loc?.column}`);
        }
        if (constants.has(node.left.name) || constants.has(node.left.object?.name)) {
          throw new Error(`${node.left.name ?? node.left.object?.name} is a constant.\nDo not reassign, at line: ${node.left.loc?.line} and column: ${node.left.loc?.column}`);
        }
      } else if (node.type === "FunctionDeclaration") {
        if (scope.has(node.name)) {
          throw new Error(`Function ${node.name} redeclared, at line: ${node.loc?.line} and column: ${node.loc?.column}`);
        }
        if (builtins.includes(node.name) || builtinConst.includes(node.name)) {
          throw new Error(`Function ${node.name} is a builtin var/constant.\nDo not redeclare, at line: ${node.loc?.line} and column: ${node.loc?.column}`);
        }

        let funcScope = new Set();
        node.params.forEach(e => {
          funcScope.add(e);
        });
        scope.add(node.name);

        let funcConstants = new Set();
        node.body.forEach(e => visit(e, funcScope, funcConstants));
      } else if (node.type === "IfStatement") {
        let statementScope = new Set();
        let statementConstants = new Set();
        node.alternate?.forEach(e => visit(e, statementScope, statementConstants));

        statementScope = new Set();
        statementConstants = new Set();
        node.consequent.forEach(e => visit(e, statementScope, statementConstants));
      } else if (node.type === "WhileStatement") {
        let statementScope = new Set();
        let statementConstants = new Set();
        node.body.forEach(e => visit(e, statementScope, statementConstants));
      } else if (node.type === "ForStatement") {
        let statementScope = new Set();
        let statementConstants = new Set();
        node.body.forEach(e => visit(e, statementScope, statementConstants));
        visit(node.init, statementScope, statementConstants);
        visit(node.update, statementScope, statementConstants)
      } else if (node.type === "LambdaExpression") {
        let statementScope = new Set();
        let statementConstants = new Set();

        node.params.forEach(e => {
          statementScope.add(e);
        });

        Array.isArray(node.body) ?
          node.body.forEach(e => visit(e, statementScope, statementConstants)) :
          visit(node.body, statementScope, statementConstants)
      } else if (node.type === "CallExpression") {
        if (node.callee?.name === "__injs") {
          throw new Error(`This function is in development and shouldn't be called, at line: ${node.loc?.line} and column: ${node.loc?.column}`);
        } else if (node.callee?.name === "__addToPrototype") {
          console.warn(`Adding to a DataType Prototype can cause some issues.\nMake sure you know what you are doing, at line: ${node.loc?.line} and column: ${node.loc?.column}\n`);
        }
        let statementScope = new Set(scope);
        let statementConstants = new Set(constants);
        node.arguments.forEach(e => visit(e, statementScope, statementConstants));
      }
    }
  }

  ast.body.forEach(node => visit(node, progScope, progConstants));
}

module.exports = semantic;