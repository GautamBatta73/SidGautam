const Op = require("./bytecode");
const { ProgramExit, ThrownError } = require("./ScriptErrors");
const { Prototypes, definePrototype } = require("./prototypes.js");
let loadLibrary = undefined;

function runFunction(chunk, params, args, parentEnv, thisObj = null) {
    let localEnv = createEnv(parentEnv);

    if (thisObj !== null) {
        localEnv.vars.this = {
            value: thisObj,
            constant: true
        };
    }

    params.forEach((name, i) => {
        localEnv.vars[name] = {
            value: args[i],
            constant: false
        };
    });

    return runChunk(chunk, localEnv, true);
}

function run(chunk) {
    let globalEnv = createEnv();
    loadLibrary = require("../run.js").loadLibrary;
    addNativeFunctions(globalEnv.vars);

    return runChunk(chunk, globalEnv);
}

function NativeFunction(args, fn, name = null) {
    return {
        type: "NativeFunction",
        params: args || [],
        call: fn,
        name
    };
}

function addNativeFunctions(globalEnv) {
    globalEnv.true = { value: true, constant: true };
    globalEnv.false = { value: false, constant: true };
    globalEnv.NULL = { value: null, constant: true };
    globalEnv.__ARGS = { value: (process.env.ARGS ? process.env.ARGS.split("\n") : []), constant: true };
    globalEnv.__SCRIPT_DIR = { value: process.env.RUN_PATH, constant: true };
    globalEnv.dataType = {
        value: NativeFunction(["obj"], (args) => getDataType(args[0])),
        constant: true
    }
    globalEnv.str = {
        value: NativeFunction(["obj"], (x) => {
            let str = getPrintable(x[0] ?? null);
            return String(str ?? "NULL");
        }),
        constant: true
    };
    globalEnv.int = {
        value: NativeFunction(["obj"], (x) => {
            let str = String(getPrintable(x[0]));
            return (isNaN(parseInt(str)) ? 0 : parseInt(str));
        }),
        constant: true
    };
    globalEnv.double = {
        value: NativeFunction(["obj"], (x) => {
            let str = String(getPrintable(x[0]));
            return (isNaN(parseFloat(str)) ? 0 : parseFloat(str));
        }),
        constant: true
    };
    globalEnv.trim = {
        value: NativeFunction(["str"], (x) => String(getPrintable(x[0])).trim()),
        constant: true
    };
    globalEnv.__addToPrototype = {
        value: NativeFunction(["dataType", "name", "fn"], (args) => {
            const dataType = args[0];
            const name = args[1];
            const fn = args[2];
            const proto = args[3];

            if (fn.type == "NativeFunction") {
                throw new Error("__addToPrototype() expects a Non-Native Function");
            } else if (fn.type !== "Function") {
                throw new Error("__addToPrototype() expects a DataType, FunctionName, FunctionObject");
            }

            definePrototype(dataType, name, fn, proto)
        }, "__addToPrototype"),
        constant: true
    }
    globalEnv.exit = {
        value: NativeFunction(["exitCode"], (args) => {
            const code = args[0] ?? 0;
            throw new ProgramExit(code);
        }),
        constant: true
    }
    globalEnv.Error = {
        value: NativeFunction(["message"], (args) => {
            const message = args[0] ?? "An Unexpected Error Occurred";
            throw new ThrownError(message);
        }),
        constant: true
    }
    globalEnv.catchError = {
        value: NativeFunction(["fn"], (args) => {
            const fn = args[0];
            let returnObj = {
                success: true,
                message: null
            }

            if (fn.type == "NativeFunction") {
                throw new Error("catchError() expects a Non-Native Function");
            } else if (fn.type !== "Function") {
                throw new Error("catchError() expects a FunctionObject");
            }

            try {
                runFunction(fn.chunk, fn.params, [], fn.env, fn.this ?? null);
            } catch (error) {
                if (error instanceof ProgramExit) {
                    throw error;
                }
                returnObj.success = false;
                returnObj.message = error.message ?? String(error);
            }

            return returnObj;
        }),
        constant: true
    }
    globalEnv.print = {
        value: NativeFunction(["...obj(s)"], (args) => {
            let printableArgs = args.map(getPrintable)
            console.log(...printableArgs);
            return null;
        }),
        constant: true
    }
    globalEnv.errPrint = {
        value: NativeFunction(["...obj(s)"], (args) => {
            let printableArgs = args.map(getPrintable)
            console.error(...printableArgs);
            return null;
        }),
        constant: true
    }
    globalEnv.len = {
        value: NativeFunction(["str/list"], (args) => {
            const x = args[0];
            if (Array.isArray(x) || typeof x === "string") {
                return x.length;
            }
            throw new Error("len() expects list or string");
        }),
        constant: true
    }
    globalEnv.isEmpty = {
        value: NativeFunction(["str/list"], (args) => {
            const x = args[0];
            if (Array.isArray(x)) {
                return (!x || x.length === 0)
            } else if (typeof x === "string") {
                return (!x || x.trim().length === 0)
            } else {
                throw new Error("isEmpty() expects list or string");
            }
        }),
        constant: true
    }
}

function getPrintable(obj) {
    function printerize(newObj) {
        let objType = getDataType(newObj);

        if (objType === "List") {
            return newObj.map(printerize);
        } else if (objType === "Function") {
            return `FunctionObject(${newObj.params ? newObj.params.join(", ") : ""})`;
        } else if (objType === "Object") {
            if (newObj.stringify && getDataType(newObj.stringify) === "Function") {
                let fn = newObj.stringify;
                const result = runFunction(fn.chunk, fn.params, [], fn.env, newObj);
                return printerize(result ?? null);
            } else {
                let arr = {};
                Object.entries(newObj).forEach(([key, value]) => {
                    arr[key] = printerize(value);
                });
                return arr;
            }
        } else if (objType === "NULL") {
            return null;
        }

        return newObj;
    }

    let x = printerize(obj);

    if (Array.isArray(x) || (typeof x === "object" && x !== null)) {
        return JSON.stringify(x, null, 2);
    } else {
        return x ?? null;
    }
}

function runChunk(chunk, env, func = false) {
    const stack = [];
    let ip = 0;

    while (ip < chunk.code.length) {
        const instr = chunk.code[ip++];
        switch (instr.op) {
            case Op.IMPORT: {
                const path = chunk.constants[instr.arg];
                const { libName, libPath, importedChunk } = loadLibrary(path, envGet(env, "__SCRIPT_DIR")?.value);

                if (envGet(env, libName, true)) {
                    break;
                } else {
                    env.libraries.push(libName);
                }

                const libEnv = createEnv(env);
                libEnv.vars.__SCRIPT_DIR = { value: libPath, constant: true };

                runChunk(importedChunk, libEnv);

                let [{ __SCRIPT_DIR, ...tempVars }, tempLibs, tempProto] = [libEnv.vars, libEnv.libraries, libEnv.prototypes];
                Object.assign(env.vars, tempVars);
                Object.assign(env.libraries, tempLibs);
                Object.assign(env.prototypes, tempProto);
                break;
            }

            case Op.DUP: {
                const top = stack[stack.length - 1];
                stack.push(top);
                break;
            }

            case Op.PUSH_CONST: {
                const value = chunk.constants[instr.arg];

                if (value?.type === "Function") {
                    // Create a fresh closure instance
                    const fn = {
                        ...value,
                        env,
                    };

                    stack.push(fn);
                } else {
                    stack.push(value);
                }

                break;
            }

            case Op.LOAD: {
                if (instr.arg.trim() === "null")
                    throw new Error(`I think you may have meant 'NULL', at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);

                const slot = envGet(env, instr.arg);
                if (!slot) throw new Error(`Undefined variable '${instr.arg}', at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                stack.push(slot.value);
                break;
            }

            case Op.LOAD_SAFE: {
                // Safe load for optional chaining
                const slot = envGet(env, instr.arg);
                stack.push(slot?.value);
                break;
            }

            case Op.DECL_VAR: {
                if (env.vars[instr.arg])
                    throw new Error(`Variable '${instr.arg}' redeclared, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);

                env.vars[instr.arg] = {
                    value: null,
                    constant: false
                };
                break;
            }

            case Op.STORE: {
                const value = stack.pop();

                const existing = envGet(env, instr.arg);
                if (existing?.constant) {
                    throw new Error(`Cannot reassign constant '${instr.arg}', at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                }
                try {
                    envSet(env, instr.arg, value);
                } catch (error) {
                    throw new Error(`${error.message}, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`)
                }
                break;
            }

            case Op.STORE_CONST: {
                if (envGet(env, instr.arg))
                    throw new Error(`Constant '${instr.arg}' redeclared, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);

                env.vars[instr.arg] = {
                    value: stack.pop(),
                    constant: true
                };
                break;
            }

            case Op.POP:
                stack.pop();
                break;

            case Op.ADD: case Op.SUB: case Op.MUL: case Op.DIV: case Op.MOD:
                let b = getPrintable(stack.pop());
                let a = getPrintable(stack.pop());

                if (b === 0 && instr.op === Op.DIV) {
                    stack.push(null);
                    break;
                }

                stack.push(
                    (instr.op === Op.ADD ? a + b :
                        instr.op === Op.SUB ? a - b :
                            instr.op === Op.MUL ? a * b :
                                instr.op === Op.MOD ? a % b :
                                    a / b) || 0
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

            case Op.PUSH_ENV:
                env = createEnv(env);
                break;

            case Op.POP_ENV:
                env = env.parent;
                break;

            case Op.JUMP:
                ip = instr.arg;
                break;

            case Op.JUMP_IF_TRUE: {
                const cond = stack.pop();
                if (typeof cond !== "boolean") throw new Error(`Unless and Though statements must use boolean conditions, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                if (cond) ip = instr.arg;
                break;
            }

            case Op.JUMP_IF_FALSE: {
                const cond = stack.pop();
                if (typeof cond !== "boolean") throw new Error(`Until loops must use boolean conditions, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                if (!cond) ip = instr.arg;
                break;
            }

            case Op.JUMP_IF_NOT_NULL: {
                const value = stack.pop();
                if (getDataType(value) !== "NULL") ip = instr.arg;
                break;
            }

            case Op.JUMP_IF_NULL: {
                const value = stack.pop();
                if (getDataType(value) === "NULL") ip = instr.arg;
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
                        if (fn.self !== null && fn.self !== undefined) args.unshift(fn.self);
                        else if (fn.name === "__addToPrototype") args.push(env.prototypes);
                        result = fn.call(args) ?? null;
                    } catch (error) {
                        if (error instanceof ProgramExit || error instanceof ThrownError) {
                            throw error;
                        }
                        throw new Error(`${error.message ?? String(error).trimEnd()}, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`)
                    }
                    stack.push(result);
                    break;
                }

                // User-defined function
                if (fn.type === "Function") {
                    if (fn.self !== null && fn.self !== undefined) args.unshift(fn.self);
                    const result = runFunction(fn.chunk, fn.params, args, fn.env, fn.this ?? null);
                    stack.push(result ?? null);
                    break;
                }

                throw new Error(`Not a function, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
            }

            case Op.CALL_IF_NOT_NULL: {
                const argc = instr.arg;

                // Peek callee
                const callee = stack[stack.length - 1];

                if (getDataType(callee) === "NULL") {

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
                        if (fn.self !== null && fn.self !== undefined) args.unshift(fn.self);
                        else if (fn.name === "__addToPrototype") args.push(env.prototypes);
                        result = fn.call(args) ?? null;
                    } catch (error) {
                        if (error instanceof ProgramExit || error instanceof ThrownError) {
                            throw error;
                        }
                        throw new Error(`${error.message ?? String(error).trimEnd()}, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                    }
                    stack.push(result);
                    break;
                }

                // User-defined function
                if (fn.type === "Function") {
                    if (fn.self !== null && fn.self !== undefined) args.unshift(fn.self);
                    const result = runFunction(fn.chunk, fn.params, args, fn.env, fn.this ?? null);
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

                if (typeof obj === "string") {// Strings
                    if (typeof index === "number") {
                        stack.push(obj[index]);
                        break;
                    }

                    const method = prototypesGet(env, "String", index);
                    if (!method) {
                        throw new Error(`String has no method '${index}', at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                    }

                    method.self = obj;
                    stack.push(method);
                    break;
                } else if (Array.isArray(obj)) {// Lists
                    if (typeof index === "number") {
                        stack.push(obj[index]);
                        break;
                    }

                    const method = prototypesGet(env, "List", index);
                    if (!method) {
                        throw new Error(`List has no method '${index}', at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                    }

                    method.self = obj;
                    stack.push(method);
                    break;
                } else if (typeof obj === "object" && obj !== null) {// Objects
                    if (obj.type) {
                        if (obj.type === "Function" || obj.type === "NativeFunction") {
                            throw new Error(`FunctionObject has no method '${index}', at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
                        }
                    }

                    if (typeof index === "string") {
                        if (Object.hasOwn(obj, index)) {
                            if (getDataType(obj[index]) === "Function") obj[index].this = obj;
                            stack.push(obj[index]);
                            break;
                        } else {
                            const method = prototypesGet(env, "Object", index);
                            if (method) {
                                method.self = obj;
                            }

                            stack.push(method);
                            break;
                        }
                    } else {
                        stack.push(null);
                    }
                } else {
                    throw new Error(`Cannot index non-list/non-string/non-object, at line: ${instr.loc?.line} and column: ${instr.loc?.column}`);
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

function getDataType(args) {
    let x = args;
    if (typeof x === "number") return "Number";
    if (typeof x === "string") return "String";
    if (typeof x === "boolean") return "Boolean";
    if (Array.isArray(x)) return "List";
    if (typeof x === "object" && x !== null) {
        if (x.type) {
            if (x.type === "Function" || x.type === "NativeFunction") {
                return "Function";
            }
        }
        return "Object";
    }

    return "NULL";
}

function createEnv(parent = null) {
    return {
        vars: Object.create(null),
        parent,
        libraries: [],
        prototypes: Prototypes()
    };
}

function prototypesGet(env, type, name) {
    while (env) {
        if (env.prototypes[type][name]) return env.prototypes[type][name];
        env = env.parent;
    }
    return null;
}

function envGet(env, name, lib = false) {
    while (env) {
        if (lib && env.libraries.includes(name)) return name;
        else if (name in env.vars) return env.vars[name];
        env = env.parent;
    }
    return null;
}

function envSet(env, name, value) {
    let cur = env;
    while (cur) {
        if (name in cur.vars) {
            if (cur.vars[name].constant)
                throw new Error(`Cannot reassign constant '${name}'`);
            cur.vars[name].value = value;
            return;
        }
        cur = cur.parent;
    }

    throw new Error(`Assignment to undeclared variable '${name}'`);
}

// function cloneEnv(env) {
//     if (!env) return null;

//     const cloned = {
//         vars: Object.create(null),
//         parent: cloneEnv(env.parent)
//     };

//     for (const [k, v] of Object.entries(env.vars)) {
//         cloned.vars[k] = {
//             value: v.value,
//             constant: v.constant
//         };
//     }

//     return cloned;
// }

module.exports = run;