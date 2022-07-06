function transformCssText(cssText) {
    if (!cssText) { return {} }
    if (cssText.endsWith(';')) cssText = cssText.slice(0, -1)
    return cssText.replace(/ /g, '').split(';').map(items => {
        const [key, value] = items.split(':')
        const key2 = line2camel(key)
        const value2 = value.endsWith('px') ? parseFloat(value.slice(0, -2)) : value
        return [key2, value2]
    }).reduce((ac, el) => {
        const [key, value] = el
        ac[key] = value
        return ac
    }, {})
}




function line2camel(str) {
    return str.replace(/-([a-z])/g, (a, b) => b.toUpperCase())
}

export default transformCssText