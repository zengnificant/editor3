import getIndexByOffset from '@src/immutable/block/getIndexByOffset.js'
import { backspaceCommand } from '@src/command/backspace.js'
const isSelectionAtStartOfContent = (content, sel) => {
    const { start, startKey } = sel
    const firstBlockKey = content.getFirstBlock().getKey()
    return startKey === firstBlockKey && start === 0
}

const isSelectionAtStartOfBlock = (content, sel) => {
    const { start, startKey } = sel
    const block = content.getBlockForKey(startKey)
    return block && start === 0
}


export const backspaceBlockCommand = (content, sel) => {
    const { start, startKey, isCollapsed } = sel
    const block = content.getBlockForKey(startKey)
    const blockList = block.getList()
    if (!isCollapsed || isSelectionAtStartOfContent(content, sel) || isSelectionAtStartOfBlock(content, sel)) {
        return backspaceCommand(content, sel)
    }

    const sel2 = sel.merge({ a: 0, b: 0, aKey: startKey, bKey: startKey, isBackward: true })
    const content2 = content.setIn(['blockMap', startKey], block.createEmptyBlock())
    console.log(block.createEmptyBlock().getList().first())
    return { content: content2, selection: sel2 }

}