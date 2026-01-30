const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk").default;
const compile = require("./src/compiler.js")
const VERSION = "2.6.0";

const originalError = console.error;
console.error = (...args) => {
    const coloredArgs = args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
            return chalk.bold.red(JSON.stringify(arg, null, 2));
        }
        return chalk.bold.red(arg);
    });

    originalError(...coloredArgs);
};

const originalWarn = console.warn;
console.warn = (...args) => {
    const coloredArgs = args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
            return chalk.bold.hex('#FFA500')(JSON.stringify(arg, null, 2));
        }
        return chalk.bold.hex('#FFA500')(arg);
    });

    originalWarn(...coloredArgs);
};

program
    .name("SGC")
    .version(VERSION)
    .description("A compiler for SidGautamScript")
    .argument('<file>', ".sidg File to Compile")
    .action(() => {
        let fileName = program.args[0]
        let file = fileName ? fs.existsSync(fileName) : false
        if (file) {
            if (fileName.endsWith(".sidg")) {
                try {
                    let filePath = path.dirname(fileName)
                    let code = fs.readFileSync(fileName, "utf8");

                    let translatedCode = compile(code)
                    let compiledCode = JSON.stringify(translatedCode);

                    let compileFile = path.basename(fileName, path.extname(fileName)) + ".sidgc"
                    fs.writeFileSync(path.join(filePath, compileFile), compiledCode, 'utf8');
                    console.log("Compiled!");
                } catch (error) {
                    console.error(error.message);
                }
            } else {
                console.error("Error: This command can only compile .sidg files.");
            }
        } else {
            console.error("Error: Parameter must be a .sidg file.")
        }
        process.exit(0);
    });

program.parse(process.argv)