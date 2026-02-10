const Prototypes = () => ({
    Number: Object.create(null),
    String: Object.create(null),
    List: Object.create(null),
    Object: Object.create(null),
});

function definePrototype(type, name, fn, proto = {}) {
    if (!proto[type]) {
        throw new Error(`Unknown prototype type '${type}'`);
    } else if (proto[type][name]) {        
        throw new Error(`Cannot overwrite the ${type} Prototypes's Existing Methods`);
    }

    proto[type][name] = fn;
}

module.exports = {
    Prototypes,
    definePrototype
};
