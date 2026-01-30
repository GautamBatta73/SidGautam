class ProgramExit {
    constructor(code) {
        this.code = code;
    }
}

class ThrownError {
    constructor(message) {
        this.message = message ?? "An Unexpected Error Occurred";
    }
}

module.exports = {
    ProgramExit,
    ThrownError
};