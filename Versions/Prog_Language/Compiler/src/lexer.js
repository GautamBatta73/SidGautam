const TOKEN_TYPES = {
    NUMBER: "NUMBER",
    IDENT: "IDENT",
    KEYWORD: "KEYWORD",
    OPERATOR: "OPERATOR",
    PUNCT: "PUNCT",
    ARROW: "ARROW",
    STRING: "STRING"
};

const keywords = new Set(["final", "var", "unless", "orElse", "though", "func", "pass", "until", "import"]);

function lexer(input) {
    let i = 0;
    const tokens = [];
    let line = 1;
    let column = 1;

    while (i < input.length) {
        const char = input[i];

        if (char === "\n") {
            line++;
            column = 1;
        } else {
            column++;
        }

        if (char === "#" && input[i + 1] === " ") {
            let current = char;
            while (current && current !== "\n") {
                current = input[i++];
            }
            continue;
        }

        if (/\s/.test(char)) {
            i++;
            continue;
        }

        // Numbers
        if (/\d/.test(char)) {
            let num = "";
            let hasDot = false;

            while (i < input.length) {
                const c = input[i];

                if (/\d/.test(c)) {
                    num += c;
                    i++;
                } else if (c === "." && !hasDot) {
                    hasDot = true;
                    num += c;
                    i++;
                } else {
                    break;
                }
            }

            tokens.push({
                type: TOKEN_TYPES.NUMBER,
                value: num,
                line,
                column
            });
            continue;
        }

        // Identifiers / keywords
        if (/[a-z]/i.test(char)) {
            let ident = "";
            while (/[a-z0-9_]/i.test(input[i])) {
                ident += input[i++];
            }
            tokens.push({
                type: keywords.has(ident) ? TOKEN_TYPES.KEYWORD : TOKEN_TYPES.IDENT,
                value: ident, line, column
            });
            continue;
        }

        if (char === "-" && input[i + 1] === ">") {
            i += 2;
            tokens.push({ type: TOKEN_TYPES.ARROW, value: "->", line, column });
            continue;
        }

        // Operators
        if ("=+-*/!<>|&?".includes(char)) {
            let op = char;
            i++;

            // Two-character operators
            if (
                (op === "=" || op === "!" || op === "<" || op === ">") &&
                input[i] === "="
            ) {
                op += input[i++];
            } else if ((op === "&" && input[i] === "&") ||
                (op === "|" && input[i] === "|")) {
                op += input[i++];
            } else if (
                op === "?" &&
                (input[i] === "?" || input[i] === ".")
            ) {
                op += input[i++];
            }

            tokens.push({
                type: TOKEN_TYPES.OPERATOR,
                value: op, line, column
            });
            continue;
        }

        // Strings
        if (char === '"') {
            let str = "";
            i++; // skip opening quote

            while (i < input.length && input[i] !== '"') {
                // Handle escapes later if you want
                if (input[i] === "\n") {
                    throw new Error(`Unterminated string at line ${line}`);
                }
                str += input[i++];
            }

            if (input[i] !== '"') {
                throw new Error(`Unterminated string at line ${line}`);
            }

            i++; // skip closing quote

            tokens.push({
                type: TOKEN_TYPES.STRING,
                value: str,
                line,
                column
            });

            continue;
        }


        // Punctuation
        if ("();{},[]:.".includes(char)) {
            tokens.push({ type: TOKEN_TYPES.PUNCT, value: char, line, column });
            i++;
            continue;
        }

        throw new Error(`Unexpected character: ${char}, at line: ${line} and column: ${column}`);
    }

    return tokens;
}

module.exports = lexer;
