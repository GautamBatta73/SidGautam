const { program } = require("commander");
let libraryCache = new Map();
let filePath = "";
const Chunk = require("./src/chunk");
const { ProgramExit } = require("./src/ScriptErrors");
const fs = require("fs");
const path = require("path");
const exePath = __dirname || path.dirname(process.execPath);
const chalk = require("chalk").default;
const run = require("./src/vm");
const VERSION = "2.7.0";

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
    .name("SG")
    .version(VERSION)
    .description("An executor for Compiled SidGautamScript")
    .argument('<file>', ".sidgc File to Run")
    .argument('[args...]', "Optional Arguments To Pass To The Script")
    .action((cmd, args) => {
        libraryCache = new Map();
        module.exports["libraryCache"] = libraryCache;
        let fileName = cmd;
        let file = fileName ? fs.existsSync(fileName) : false
        if (file) {
            if (fileName.endsWith(".sidgc")) {
                try {
                    filePath = path.dirname(fileName)
                    let compiledCode = fs.readFileSync(fileName, "utf8");
                    let decompiledCode = JSON.parse(compiledCode);
                    let decompiledChunk = Object.assign(new Chunk(), decompiledCode);

                    process.env.EXE_PATH = exePath;
                    process.env.ARGS = args.join("\n") || "";
                    process.env.MODULE_PATH = path.join(exePath, "modules/");
                    process.env.RUN_PATH = path.resolve(filePath);
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

function loadLibrary(filename, scriptPath) {
    let libName = "";
    if (filename.startsWith('./') || filename.startsWith('../')) {
        filename = path.join(scriptPath, filename);
    } else {
        filename = path.join(exePath, filename);
    }

    if (fs.existsSync(filename) || fs.existsSync(filename + ".sidgc")) {
        libName = path.basename(filename);

        if (!filename.endsWith(".sidgc")) {
            if (fs.existsSync(filename + ".sidgc") && fs.statSync(filename + ".sidgc").isFile()) filename += ".sidgc";
            else if (fs.existsSync(filename) && fs.statSync(filename).isDirectory()) filename = path.join(filename, "lib.sidgc");
        } else libName = path.basename(filename, ".sidgc");
    }

    let file = filename ? fs.existsSync(filename) : false
    if (file) {
        try {
            let fullPath = path.resolve(filename);
            let libPath = path.dirname(fullPath.toLowerCase());

            if (libraryCache.has(libName)) {
                return {libName, libPath, importedChunk: libraryCache.get(libName)["importedChunk"]};
            }

            let compiledCode = fs.readFileSync(filename, "utf8");
            let decompiledCode = JSON.parse(compiledCode);
            let decompiledChunk = Object.assign(new Chunk(), decompiledCode);

            libraryCache.set(libName, { libPath, importedChunk: decompiledChunk });

            return { libName, libPath, importedChunk: decompiledChunk };
        } catch (error) {
            if (error instanceof ProgramExit) {
                process.exit(error.code);
            }
            throw error;
        }
    }
    throw new Error("Import must point to a valid .sidgc file");
}

module.exports = { loadLibrary };
program.parse(process.argv);