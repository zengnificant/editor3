import control from './control.js'

const removeInlineStyleForMeta = (meta, inlineStyle = {}) => {
    const decoratorTree = meta.getDecoratorTree()
    let index = 0

    let decorator = decoratorTree.get(0)

    let keys = Object.keys(inlineStyle)
    let metaInlineStyle = decorator.getInlineStyle();
    metaInlineStyle = keys.reduce((ac, el) => {
        return metaInlineStyle.delete(el)
    }, metaInlineStyle)

    return meta.setIn(['decoratorTree', index, 'inlineStyle'], metaInlineStyle)
}



export default control(removeInlineStyleForMeta)