export const moveSelectionToStartOfBlockCommand = (content, sel) => {
    const { startKey } = sel

    const selection = sel.merge({ a: 0, b: 0, aKey: startKey, bKey: startKey, isBackward: true })

    return { content, selection }

}