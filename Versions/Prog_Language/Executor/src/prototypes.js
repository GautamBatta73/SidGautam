const Prototypes = {
    Number: Object.create(null),
    String: Object.create(null),
    List: Object.create(null),
    Object: Object.create(null),
};

function definePrototype(type, name, fn) {
    if (!Prototypes[type]) {
        throw new Error(`Unknown prototype type '${type}'`);
    } else if (Prototypes[type][name]) {
        throw new Error(`Cannot overwrite the ${type} Prototypes's Existing Methods`);
    }

    Prototypes[type][name] = fn;
}

module.exports = {
    Prototypes,
    definePrototype
};
