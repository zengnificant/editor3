export const moveSelectionToEndOfBlockCommand = (content, sel) => {
    const { endKey } = sel
    const block = content.getBlockForKey(endKey)
    const size = block.size2;
    const selection = sel.merge({ a: size, b: size, aKey: endKey, bKey: endKey, isBackward: false })

    return { content, selection }

}