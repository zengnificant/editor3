const removeTag = (state, tag) => {
    let { selection, content } = state;
    const { isCollapsed } = selection;
    if (isCollapsed) return state.onChange(state);


    const { startKey, endKey, start, end } = selection;
    let blockA = content.getBlockForKey(startKey)

    if (startKey === endKey) {
        blockA = removeTagForBlock(blockA, tag, [start, end])
        content = content.updateBlock(blockA)
        return state.onChange({ ...state, content })

    }
    let blocks = content.getBlocks(selection)
    blocks = blocks.map((block, index) => {
        if (index === 0) return removeTagForBlock(block, tag, [start, block.size2])
        if (index === blocks.size - 1) return removeTagForBlock(block, tag, [0, end])
        return removeTagForBlock(block, tag, [0, block.size2])
    })

    content = content.updateBlocks(blocks)
    return state.onChange({ ...state, content })

}

const removeTagForMeta = (meta, tag) => {
    const decoratorTree = meta.getDecoratorTree()
    const decoratorTree2 = decoratorTree.filter(decorator => {

        return decorator.getTag() !== tag

    });

    if (decoratorTree.size === decoratorTree2.size) return meta;
    return meta.set('decoratorTree', decoratorTree2)
}

const removeTagForMetaList = (list, tag) => {
    return list.map(meta => removeTagForMeta(meta, tag))
}

const removeTagForBlock = (block, tag, range = [0, 0]) => {
    const [start, end] = range

    const indexA = block.getIndexByOffset(start)
    const indexB = block.getIndexByOffset(end)
    const blockList = block.getList()
    const metaList = removeTagForMetaList(blockList.slice(indexA + 1, indexB + 1), tag);
    const retList = blockList.slice(0, indexA + 1).concat(metaList).concat(blockList.slice(indexB + 1))
    return block.set('list', retList)
}




export default removeTag