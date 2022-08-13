import currying from './currying.js'
const defaultFn = (metaFn, state, ...args) => {

    let { selection, content } = state;
    const { isCollapsed } = selection;
    if (isCollapsed) return state;

    const metaListFn = (list) => {
        return list.map(meta => metaFn(meta, ...args))
    }
    const blockFn = (block, range) => {
        const [start, end] = range

        const indexA = block.getIndexByOffset(start)
        const indexB = block.getIndexByOffset(end)
        const blockList = block.getList()
        const metaList = metaListFn(blockList.slice(indexA + 1, indexB + 1));
        const retList = blockList.slice(0, indexA + 1).concat(metaList).concat(blockList.slice(indexB + 1))
        return block.set('list', retList)
    }
    const { startKey, endKey, start, end } = selection;
    let blockA = content.getBlockForKey(startKey)

    if (startKey === endKey) {
        blockA = blockFn(blockA, [start, end])
        content = content.updateBlock(blockA)
        return state.onChange(state, { content })

    }
    let blocks = content.getBlocks(selection)
    blocks = blocks.map((block, index) => {
        if (index === 0) return blockFn(block[start, block.size2])
        if (index === blocks.size - 1) return blockFn(block, [0, end])
        return blockFn(block, [0, block.size2])
    })

    content = content.updateBlocks(blocks)
    return state.onChange(state, { content })
}

const control = currying(defaultFn)


export default control