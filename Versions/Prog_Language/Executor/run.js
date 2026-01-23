const { program } = require("commander");
let moduleCache = new Map();
let filePath = "";
const Chunk = require("./src/chunk");
const ProgramExit = require("./src/ProgramExit");
const fs = require("fs");
const path = require("path");
const exePath = __dirname || path.dirname(process.execPath);
const chalk = require("chalk").default;
const run = require("./src/vm");
const VERSION = "2.5.5";

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
    .name("SidGautamScript Executor")
    .version(VERSION)
    .description("An executor for Compiled SidGautamScript")
    .argument('<file>', ".sidgc File to Run")
    .action(() => {
        moduleCache = new Map();
        let fileName = program.args[0]
        let file = fileName ? fs.existsSync(fileName) : false
        if (file) {
            if (fileName.endsWith(".sidgc")) {
                try {
                    filePath = path.dirname(fileName)
                    let compiledCode = fs.readFileSync(fileName, "utf8");
                    let decompiledCode = JSON.parse(compiledCode);
                    let decompiledChunk = Object.assign(new Chunk(), decompiledCode);

                    process.env.EXE_PATH = exePath;
                    process.env.MODULE_PATH = path.join(exePath, "modules/");
                    process.env.RUN_PATH = filePath;
                    run(decompiledChunk);
                } catch (error) {
                    if (error instanceof ProgramExit) {
                        process.exit(error.code);
                    }
                    console.error(error.message);
                }
            } else {
                console.error("Error: This command can only run .sidgc files.");
            }
        } else {
            console.error("Error: Parameter must be a .sidgc file.")
        }
        process.exit(0);
    });

function loadModule(filename) {
    if (filename.startsWith('./') || filename.startsWith('../')) {
        filename = path.join(filePath, filename);
    } else {
        filename = path.join(exePath, filename);
    }

    if (!filename.endsWith(".sidgc")) {
        filename += ".sidgc";
    }

    let file = filename ? fs.existsSync(filename) : false
    if (file) {
        try {
            let fullPath = path.resolve(filename);

            if (moduleCache.has(fullPath.toLowerCase())) {
                return;
            }

            let compiledCode = fs.readFileSync(filename, "utf8");
            let decompiledCode = JSON.parse(compiledCode);
            let decompiledChunk = Object.assign(new Chunk(), decompiledCode);

            moduleCache.set(fullPath.toLowerCase());

            return decompiledChunk;
        } catch (error) {
            if (error instanceof ProgramExit) {
                process.exit(error.code);
            }
            throw error;
        }
    }
    throw new Error("Import must point to a valid .sidgc file");
}

module.exports = loadModule;
program.parse(process.argv);