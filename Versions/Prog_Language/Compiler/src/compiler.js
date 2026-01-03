const lexer = require("./lexer");
const parser = require("./parser");
const semantic = require("./semantic");
const Chunk = require("./bytecode/chunk");
const generate = require("./codegen");
const optimize = require("./optimizer");

function compile(code) {
    const tokens = lexer(code);
    const ast = parser(tokens);
    semantic(ast);
    const optimized = optimize(ast);

    const chunk = new Chunk();
    generate(optimized, chunk);

    const output = chunk
    return output;
}

module.exports = compile;