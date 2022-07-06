import { splitCommand } from '@src/command/split.js'




const insertFragmentIntoContent = (cnt, sel, fragment) => {
    const { content, selection } = splitCommand(cnt, sel)
    const { startKey } = sel
    const { endKey } = selection
    const blocks = fragment.getBlocks()

    const block = content.getBlockForKey(startKey)
    const list = blocks.get(0).getList()
    let content2 = content.setIn(['blockMap', startKey, 'list'], block.getList().concat(list))

    if (blocks.size === 1) return { content: content2, selection }
    const lastBlock = blocks.last()
    const lastList = lastBlock.getList()
    const contentBlock = content.getBlockForKey(endKey)
    const listSize = lastList.size
    const selection2 = selection.merge({ a: listSize, b: listSize })
    content2 = content2.setIn(['blockMap', endKey, 'list'], contentBlock.isEmpty() ? lastList : lastList.concat(contentBlock.getList()))

    if (blocks.size === 2) {

        return { content: content2, selection: selection2 }
    }
    const blocks2 = blocks.slice(1, blocks.size - 1)
    content2 = content2.addBlockListBeforeKey(endKey, blocks2)
    return { content: content2, selection: selection2 }
}

export default insertFragmentIntoContent