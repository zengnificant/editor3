const isType = function(a) {
    a = a.slice(0, 1).toUpperCase() + a.slice(1)
    return function(b) {
        return "[object " + a + "]" === {}.toString.call(b)
    }
}

export const isObject = isType('Object')
export const isString = isType('String')
export const isArray = isType('Array')
export default {
    isObject,
    isString,
    isArray
}