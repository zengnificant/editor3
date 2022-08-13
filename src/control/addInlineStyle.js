import control from './control.js'


const addInlineStyleForMeta = (meta, inlineStyle = {}) => {
    const decoratorTree = meta.getDecoratorTree()
    let decorator = decoratorTree.get(0)
    let metaInlineStyle = decorator.getInlineStyle().merge(inlineStyle)
    return meta.setIn(['decoratorTree', 0, 'inlineStyle'], metaInlineStyle)
}



export default control(addInlineStyleForMeta)