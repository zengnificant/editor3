import { Map, OrderedMap, OrderedSet, List } from 'immutable'
import transformCssText from './transformCssText.js'


function getNodeData(node) {
    if (!node) {
        const className = OrderedSet()
        const inlineStyle = OrderedMap()
        return Map({ className, inlineStyle })

    }
    const className = OrderedSet([...node.classList])
    const inlineStyle = OrderedMap(transformCssText(node.style.cssText))
    return Map({ className, inlineStyle })


}

export default getNodeData;