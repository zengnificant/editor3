export const selectAllCommand= (content, sel) => {
    const startBlock = content.getFirstBlock()
    const startKey = startBlock.getKey()
    const endBlock = content.getLastBlock()
    const endKey = endBlock.getKey()
    const b = endBlock.size2
    return { content, selection: sel.merge({ a: 0, aKey: startKey, b, bKey: endKey }) }
}