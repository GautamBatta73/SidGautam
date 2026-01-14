const Op = {
    PUSH_CONST: "PUSH_CONST",
    LOAD: "LOAD",
    LOAD_SAFE: "LOAD_SAFE",
    STORE: "STORE",
    STORE_CONST: "STORE_CONST",
    MAKE_ARRAY: "MAKE_ARRAY",
    GET_INDEX: "GET_INDEX",
    SET_INDEX: "SET_INDEX",
    NEW_OBJECT: "NEW_OBJECT",
    SET_PROP: "SET_PROP",
    DECL_VAR: "DECL_VAR",
    DUP: "DUP",
    COALESCE: "COALESCE",

    ADD: "ADD",
    SUB: "SUB",
    MUL: "MUL",
    DIV: "DIV",
    MOD: "MOD",

    NEG: "NEG",
    NOT: "NOT",

    EQ: "EQ",
    NEQ: "NEQ",
    LT: "LT",
    GT: "GT",
    LTE: "LTE",
    GTE: "GTE",

    AND: "AND",
    OR: "OR",

    JUMP: "JUMP",
    JUMP_IF_FALSE: "JUMP_IF_FALSE",
    JUMP_IF_TRUE: "JUMP_IF_TRUE",
    JUMP_IF_NOT_NULL: "JUMP_IF_NOT_NULL",
    JUMP_IF_NULL: "JUMP_IF_NULL",
    POP_ENV: "POP_ENV",
    PUSH_ENV: "PUSH_ENV",

    CALL: "CALL",
    CALL_IF_NOT_NULL: "CALL_IF_NOT_NULL",
    RETURN: "RETURN",
    IMPORT: "IMPORT",

    POP: "POP"
};

module.exports = Op;