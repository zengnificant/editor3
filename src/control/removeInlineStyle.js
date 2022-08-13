const removeInlineStyle = (state, inlineStyle = {}) => {
    let { selection, content } = state;
    const { isCollapsed } = selection;
    if (isCollapsed) return state.onChange(state);

    const { startKey, endKey, start, end } = selection;
    let blockA = content.getBlockForKey(startKey)
    if (startKey === endKey) {
        blockA = removeInlineStyleForBlock(blockA, inlineStyle, [start, end])
        content = content.updateBlock(blockA)
        return state.onChange(state, { content })
    }
    let blocks = content.getBlocks(selection)
    blocks = blocks.map((block, index) => {
        if (index === 0) return removeInlineStyleForBlock(block, inlineStyle, [start, block.size2])
        if (index === blocks.size - 1) return removeInlineStyleForBlock(block, inlineStyle, [0, end])
        return removeInlineStyleForBlock(block, inlineStyle, [0, block.size2])
    })

    content = content.updateBlocks(blocks)
    return state.onChange(state, { content })

}

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
const removeInlineStyleForMetaList = (list, inlineStyle = {}) => {
    return list.map(meta => removeInlineStyleForMeta(meta, inlineStyle))
}

const removeInlineStyleForBlock = (block, inlineStyle = {}, range = [0, 0]) => {
    const [start, end] = range

    const indexA = block.getIndexByOffset(start)
    const indexB = block.getIndexByOffset(end)
    const blockList = block.getList()
    const metaList = removeInlineStyleForMetaList(blockList.slice(indexA + 1, indexB + 1), inlineStyle);
    const retList = blockList.slice(0, indexA + 1).concat(metaList).concat(blockList.slice(indexB + 1))
    return block.set('list', retList)
}


export default removeInlineStyle