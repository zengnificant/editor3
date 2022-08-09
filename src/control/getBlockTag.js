const getBlockTag = ({ content, selection }, shouldCheckAll = false) => {
    if (shouldCheckAll) return getBlockTag2({ content, selection })
    return getBlockTag1({ content, selection })
}

const getBlockTag1 = ({ content, selection }) => {
    const { startKey } = selection;
    const block = content.getBlockForKey(startKey);
    return block.getTag()
}

const getBlockTag2 = ({ content, selection }) => {
    const blocks = content.getBlocks(selection);
    return getSameTag(blocks)
}

function getSameTag(blocks) {
    const firstBlockTag = blocks.first().getTag()
    const check = blocks.every((b) => b.getTag() === firstBlockTag)
    if (check) {
        return firstBlockTag
    }
    return null
}


export default getBlockTag