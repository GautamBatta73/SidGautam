const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk").default;
const fetch = require("node-fetch").default;
const exePath = __dirname || path.dirname(process.execPath);
const compile = require("./src/compiler.js");
const VERSION = "2.6.5";

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

program
    .command("compile", { isDefault: true })
    .argument('<file>', ".sidg File to Compile")
    .option('-s, --silent', "Prevents Output in Console")
    .action((cmd, args) => {
        let fileName = cmd;
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
                    if (!args.silent) console.log("Compiled!");
                } catch (error) {
                    if (!args.silent) console.error(error.message);
                }
            } else {
                if (!args.silent) console.error("Error: This command can only compile .sidg files.");
            }
        } else {
            if (!args.silent) console.error("Error: Parameter must be a .sidg file.")
        }
        process.exit(0);
    });

program
    .command('install')
    .argument('<libs...>', "Names of Library(s) to install")
    .option('-s, --silent', "Prevents Output in Console")
    .option('-g, --global', "Installs the Library(s) globally")
    .action(async (cmd, args) => {
        try {
            for (let i = 0; i < cmd.length; i++) {
                const el = cmd[i];
                if (!el || el.trim().length === 0) throw new Error("Error: Empty Arg Found");

                try {
                    const installDir = (!args.global ? process.cwd() : exePath);
                    await installLibraries(el, installDir);
                    if (!args.silent) console.log(`Installed '${el}' library!`);
                } catch (error) {
                    if (!args.silent) {
                        if (error.code && error.code === "ENOTFOUND") {
                            throw new Error(`Error: Could not connect to server.`);
                        } else {
                            console.error(error.message);
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error.message);
        }
        process.exit(0);
    });

async function installLibraries(libName, installDir) {
    const encodedLibName = encodeURIComponent(libName ?? "");
    const url = `https://raw.githack.com/GautamBatta73/sidgautamscript-libraries/main/libraries/${encodedLibName}/lib.sidgc`;

    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`Error: Could not find '${libName}' library`);
        }
        throw new Error(`Error: Could not fetch '${libName}' library`);
    }

    const result = await response.text();
    let filePath = path.join(installDir, `${libName}.sidgc`);

    fs.writeFileSync(filePath, result);
}

program.parse(process.argv)