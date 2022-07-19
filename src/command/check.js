export const isSelectionAtStartOfContent = (content, sel) => {
    const { start, startKey } = sel
    const firstBlockKey = content.getFirstBlock().getKey()
    return startKey === firstBlockKey && start === 0
}

export const isSelectionAtStartOfBlock = (content, sel) => {
    const { start, startKey } = sel
    const block = content.getBlockForKey(startKey)

    return block && start === 0
}
export const isSelectionAtEndOfContent = (content, sel) => {
    const { end, endKey } = sel
    const lastBlock = content.getLastBlock()
    const lastBlockKey = lastBlock.getKey()
    return endKey === lastBlockKey && end === lastBlock.size2
}

export const isSelectionAtEndOfBlock = (content, sel) => {
    const { end, endKey } = sel
    const block = content.getBlockForKey(endKey)
    return block && end === block.size2
}