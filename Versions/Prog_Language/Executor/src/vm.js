const Op = require("./bytecode");
const ProgramExit = require("./ProgramExit");
let loadModule = undefined;

function runFunction(chunk, params, args, globals) {
    globals = globals || Object.create(null);

    // Bind parameters
    params.forEach((name, i) => {
        globals[name] = {
            value: args[i],
            constant: false
        };
    });

    return runChunk(chunk, globals, true);
}


function run(chunk) {
    let globals = Object.create(null);
    loadModule = require("../run.js");
    addNativeFunctions(globals);
    return runChunk(chunk, globals);
}

function NativeFunction(fn) {
    return {
        type: "NativeFunction",
        call: fn
    };
}

function addNativeFunctions(globals) {
    globals.str = {
        value: NativeFunction((x) => {
            let str = getPrintable(x[0] ?? null);
            return String(str);
        }),
        constant: true
    };
    globals.int = {
        value: NativeFunction((x) => {
            let str = String(getPrintable(x[0]));
            return (isNaN(parseInt(str)) ? 0 : parseInt(str));
        }),
        constant: true
    };
    globals.double = {
        value: NativeFunction((x) => {
            let str = String(getPrintable(x[0]));
            return (isNaN(parseFloat(str)) ? 0 : parseFloat(str));
        }),
        constant: true
    };
    globals.trim = {
        value: NativeFunction((x) => String(getPrintable(x[0])).trim()),
        constant: true
    };

    globals.true = { value: true, constant: true };
    globals.false = { value: false, constant: true };
    globals.NULL = { value: null, constant: true };
    
    globals.exit = {
        value: NativeFunction((args) => {
            const code = args[0] ?? 0;
            throw new ProgramExit(code);
        }),
        constant: true
    }
    globals.print = {
        value: NativeFunction((args) => {
            let printableArgs = args.map(getPrintable)
            console.log(...printableArgs);
            return null;
        }),
        constant: true
    }
    globals.errPrint = {
        value: NativeFunction((args) => {
            let printableArgs = args.map(getPrintable)
            console.error(...printableArgs);
            return null;
        }),
        constant: true
    }
    globals.len = {
        value: NativeFunction((args) => {
            const x = args[0];
            if (Array.isArray(x) || typeof x === "string") {
                return x.length;
            }
            throw new Error("len() expects array or string");
        }),
        constant: true
    }
    globals.isEmpty = {
        value: NativeFunction((args) => {
            const str = String(getPrintable(args[0]));
            return (!str || str.trim().length === 0)
        }),
        constant: true
    }
}

function getPrintable(obj) {
    let printable = obj;

    if (Array.isArray(obj)) {
        let arr = [];
        obj.forEach(e => arr.push(getPrintable(e)));
        printable = JSON.stringify(arr, null, 2);
    } else if (typeof obj == "object" && obj !== null) {
        if (obj.type) {
            printable = (obj.type === "Function" || obj.type === "NativeFunction") ?
                `FunctionObject(${obj.params ? obj.params.join(", ") : ""})` :
                null;
        } else {
            printable = (Object.getPrototypeOf(obj) === Object.prototype) ?
                null :
                "Unknown-Object";
        }

        if (printable === null) {
            let arr = {};
            Object.entries(obj).forEach(([key, value]) => {
                arr[key] = getPrintable(value);
            });
            printable = JSON.stringify(arr, null, 2);
        }
    }

    return printable ?? null;
}

function runChunk(chunk, globals, func = false) {
    const stack = [];
    let ip = 0;

    while (ip < chunk.code.length) {
        const instr = chunk.code[ip++];
        switch (instr.op) {
            case Op.IMPORT: {
                const path = chunk.constants[instr.arg];
                const importedChunk = loadModule(path);

                if (!importedChunk) {
                    break;
                }

                // Execute in SAME globals
                runChunk(importedChunk, globals);
                break;
            }

            case Op.DUP: {
                const top = stack[stack.length - 1];
                stack.push(top);
                break;
            }

            case Op.PUSH_CONST:
                stack.push(chunk.constants[instr.arg]);
                break;

            case Op.LOAD:
                if (!(instr.arg in globals)) {
                    if (instr.arg.trim() === "null")
                        throw new Error(`I think you may have meant 'NULL', at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                    throw new Error(`Undefined variable '${instr.arg}', at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                }
                stack.push(globals[instr.arg].value);
                break;

            case Op.LOAD_SAFE: {
                // Safe load for optional chaining
                stack.push(globals[instr.arg].value);
                break;
            }

            case Op.STORE: {
                const value = stack.pop();

                const existing = globals[instr.arg];
                if (existing?.constant) {
                    throw new Error(`Cannot reassign constant '${instr.arg}', at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                }

                globals[instr.arg] = { value, constant: false };
                break;
            }

            case Op.STORE_CONST: {
                const value = stack.pop();

                if (instr.arg in globals) {
                    throw new Error(`Constant '${instr.arg}' redeclared, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                }

                globals[instr.arg] = {
                    value,
                    constant: true
                };
                break;
            }

            case Op.POP:
                stack.pop();
                break;

            case Op.ADD: case Op.SUB: case Op.MUL: case Op.DIV:
                const b = stack.pop();
                const a = stack.pop();
                stack.push(
                    instr.op === Op.ADD ? a + b :
                        instr.op === Op.SUB ? a - b :
                            instr.op === Op.MUL ? a * b :
                                a / b
                );
                break;

            case Op.RETURN:
                if (func) return (stack.pop() ?? null);
                break;

            case Op.NEG: {
                const a = stack.pop();
                stack.push(-a);
                break;
            }

            case Op.NOT: {
                const a = stack.pop();
                stack.push(!a ? true : false);
                break;
            }

            case Op.LT: {
                const right = stack.pop();
                const left = stack.pop();
                stack.push(left < right ? true : false);
                break;
            }

            case Op.GT: {
                const right = stack.pop();
                const left = stack.pop();
                stack.push(left > right ? true : false);
                break;
            }

            case Op.LTE: {
                const right = stack.pop();
                const left = stack.pop();
                stack.push(left <= right ? true : false);
                break;
            }

            case Op.GTE: {
                const right = stack.pop();
                const left = stack.pop();
                stack.push(left >= right ? true : false);
                break;
            }

            case Op.EQ: {
                const right = stack.pop();
                const left = stack.pop();
                if (typeof left === "string" && typeof right === "string")
                    stack.push(
                        left.trim().toLowerCase()
                            ===
                            right.trim().toLowerCase()
                            ? true : false
                    );
                else
                    stack.push(left === right ? true : false);

                break;
            }

            case Op.NEQ: {
                const right = stack.pop();
                const left = stack.pop();
                if (typeof left === "string" && typeof right === "string")
                    stack.push(
                        left.trim().toLowerCase()
                            !==
                            right.trim().toLowerCase()
                            ? true : false
                    );
                else
                    stack.push(left !== right ? true : false);

                break;
            }

            case Op.AND: {
                const right = stack.pop();
                const left = stack.pop();
                stack.push(left && right ? true : false);
                break;
            }

            case Op.OR: {
                const right = stack.pop();
                const left = stack.pop();
                stack.push(left || right ? true : false);
                break;
            }

            case Op.JUMP:
                ip = instr.arg;
                break;

            case Op.JUMP_IF_TRUE: {
                const cond = stack.pop();
                if (cond) ip = instr.arg;
                break;
            }

            case Op.JUMP_IF_FALSE: {
                const cond = stack.pop();
                if (!cond) ip = instr.arg;
                break;
            }

            case Op.JUMP_IF_NOT_NULL: {
                const value = stack.pop();
                if (value !== null &&
                    value !== undefined &&
                    value !== false) {
                    ip = instr.arg;
                }
                break;
            }

            case Op.JUMP_IF_NULL: {
                const value = stack.pop();
                if (value === null ||
                    value === undefined ||
                    value === false) {
                    ip = instr.arg;
                }
                break;
            }

            case Op.CALL: {
                const argCount = instr.arg;

                const fn = stack.pop();
                const args = [];
                for (let i = 0; i < argCount; i++) {
                    args.unshift(stack.pop());
                }

                if (!fn) throw new Error(`Calling undefined function, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);

                // Native function
                if (fn.type === "NativeFunction") {
                    let result = null;
                    try {
                        result = fn.call(args) ?? null;
                    } catch (error) {
                        if (error instanceof ProgramExit) {
                            throw error;
                        }
                        throw new Error(`${error.message}, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`)
                    }
                    stack.push(result);
                    break;
                }

                // User-defined function
                if (fn.type === "Function") {
                    const result = runFunction(fn.chunk, fn.params, args, globals);
                    stack.push(result ?? null);
                    break;
                }

                throw new Error(`Not a function, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
            }

            case Op.CALL_IF_NOT_NULL: {
                const argc = instr.arg;

                // Peek callee
                const callee = stack[stack.length - 1];

                if (callee === null ||
                    callee === undefined ||
                    callee === false) {

                    // Remove callee
                    stack.pop();

                    // Remove arguments
                    for (let i = 0; i < argc; i++) stack.pop();

                    // Push undefined result
                    stack.push(null);
                    break;
                }

                // Normal call path
                const args = [];
                for (let i = 0; i < argc; i++) args.unshift(stack.pop());

                const fn = stack.pop();

                if (!fn) throw new Error(`Calling undefined function, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);

                // Native function
                if (fn.type === "NativeFunction") {
                    let result = null;
                    try {
                        result = fn.call(args) ?? null;
                    } catch (error) {
                        if (error instanceof ProgramExit) {
                            throw error;
                        }
                        throw new Error(`${error.message}, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`)
                    }
                    stack.push(result);
                    break;
                }

                // User-defined function
                if (fn.type === "Function") {
                    const result = runFunction(fn.chunk, fn.params, args, globals);
                    stack.push(result ?? null);
                    break;
                }

                throw new Error(`Not a function, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
            }

            case Op.MAKE_ARRAY: {
                const count = instr.arg;
                const arr = [];

                for (let i = 0; i < count; i++) {
                    arr.unshift(stack.pop());
                }

                stack.push(arr);
                break;
            }

            case Op.GET_INDEX: {
                const index = stack.pop();
                const obj = stack.pop();

                if (Array.isArray(obj) || typeof obj === "string"
                    || (typeof obj === "object" && obj !== null)) {
                    stack.push(obj[index]);
                } else {
                    if (obj !== null ||
                        obj !== undefined ||
                        obj !== false) {
                        throw new Error(`Cannot index non-list/non-string/non-object, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                    }
                }
                break;
            }

            case Op.NEW_OBJECT:
                stack.push({});
                break;

            case Op.SET_PROP: {
                const value = stack.pop() ?? null;
                const key = stack.pop() ?? null;
                const obj = stack.pop();

                obj[key] = value;

                stack.push(obj);
                break;
            }

            case Op.SET_INDEX: {
                const value = stack.pop() ?? null;
                const index = stack.pop() ?? null;
                const obj = stack.pop();

                if (!Array.isArray(obj) && (typeof obj !== "object" || obj === null)) {
                    throw new Error(`Index assignment only valid on lists, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                }

                obj[index] = value;

                // Assignment expression returns the assigned value
                stack.push(value);
                break;
            }
        }
    }

    if (func) return null;
    else return stack.pop();
}

module.exports = run;