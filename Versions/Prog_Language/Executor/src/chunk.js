class Chunk {
    constructor() {
        this.code = [];
        this.constants = [];
    }

    addConst(value) {
        const index = this.constants.length;
        this.constants.push(value);
        return index;
    }

    emit(op, arg = null, loc = null) {
        this.code.push({ op, arg, loc });
    }
}

module.exports = Chunk;
