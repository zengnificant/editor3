import { Map, OrderedMap, OrderedSet, List } from 'immutable'
import transformCssText from './transformCssText.js'


function getNodeData(node) {
    if (!node) {
        const className = OrderedSet()
        const inlineStyles = OrderedMap()
        return Map({ className, inlineStyles })

    }
    const className = OrderedSet([...node.classList])
    const inlineStyles = OrderedMap(transformCssText(node.style.cssText))
    return Map({ className, inlineStyles })


}

export default getNodeData;