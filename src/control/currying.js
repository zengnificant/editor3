var currying = function(fn) {
    var args = []
    return function to() {
        args.push(...arguments)
        if (args[1] && args.length === args[1].length + 2) {
            const ret = fn.apply(this, args.slice(1))
            args = []
            return ret
        }
        return to;
    }
}


export default currying