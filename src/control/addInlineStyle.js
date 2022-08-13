import { OrderedMap } from 'immutable'
const addInlineStyle = (state, inlineStyle = {}) => {
    let { selection, content } = state;
    const { isCollapsed } = selection;
    if (isCollapsed) return state.onChange(state);

    const { startKey, endKey, start, end } = selection;
    let blockA = content.getBlockForKey(startKey)
    if (startKey === endKey) {
        blockA = addInlineStyleForBlock(blockA, inlineStyle, [start, end])
        content = content.updateBlock(blockA)
        return state.onChange(state, { content })
    }
    let blocks = content.getBlocks(selection)
    blocks = blocks.map((block, index) => {
        if (index === 0) return addInlineStyleForBlock(block, inlineStyle, [start, block.size2])
        if (index === blocks.size - 1) return addInlineStyleForBlock(block, inlineStyle, [0, end])
        return addInlineStyleForBlock(block, inlineStyle, [0, block.size2])
    })

    content = content.updateBlocks(blocks)
    return state.onChange(state, { content })

}

const addInlineStyleForMeta = (meta, inlineStyle = {}) => {
    const decoratorTree = meta.getDecoratorTree()
    let decorator = decoratorTree.get(0)
    let metaInlineStyle = decorator.getInlineStyle().merge(inlineStyle)
    return meta.setIn(['decoratorTree', 0, 'inlineStyle'], metaInlineStyle)
}
const addInlineStyleForMetaList = (list, inlineStyle = {}) => {
    return list.map(meta => addInlineStyleForMeta(meta, inlineStyle))
}

const addInlineStyleForBlock = (block, inlineStyle = {}, range = [0, 0]) => {
    const [start, end] = range

    const indexA = block.getIndexByOffset(start)
    const indexB = block.getIndexByOffset(end)
    const blockList = block.getList()
    const metaList = addInlineStyleForMetaList(blockList.slice(indexA + 1, indexB + 1), inlineStyle);
    const retList = blockList.slice(0, indexA + 1).concat(metaList).concat(blockList.slice(indexB + 1))
    return block.set('list', retList)
}


export default addInlineStyle