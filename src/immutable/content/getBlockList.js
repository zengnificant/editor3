const getBlockList = (content, selection) => {
    if (!selection) return content.getBlockMap().valueSeq().toList();
    const { startKey, endKey } = selection
    const endBlock = content.getBlockForKey(endKey)

    const ret = content.getBlockMap()
        .skipUntil((b, k) => k === startKey)
        .takeWhile((b, k) => k !== endKey)

    return ret.valueSeq().toList().push(endBlock)
}


export default getBlockList