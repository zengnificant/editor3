const Range = (a, b) => {
    return Array(b - a).fill(a).map((v, index) => v + index)
}


const add = () => {
    Array.prototype.filter__KJSHGFUKHFJSIJKNcjkhfdi__Index = function(fn) {
        const arr = []
        this.filter((v, k) => {
            if (fn(v, k)) {
                arr.push(k)
            }
            return fn(v, k)
        })
        return arr
    }
}

const remove = () => {
    delete Array.prototype.filter__KJSHGFUKHFJSIJKNcjkhfdi__Index
}


const fn = (arr, conditionFn) => {
    add()
    const indexArr = arr.filter__KJSHGFUKHFJSIJKNcjkhfdi__Index(conditionFn)
    if (indexArr.length === 0) {
        remove()
        return arr;
    }

    indexArr.push(arr.length)
    const ret = []
    indexArr.reduce((ac, el, index) => {

        let start = index === 0 ? 0 : ac + 1
        let curEl = Range(start, el).map(index => arr[index])
        if (curEl.length) ret.push(curEl)

        ret.push(arr[el]);
        return el;
    }, 0)
    remove()
    return ret.slice(0, -1)
}

export default fn