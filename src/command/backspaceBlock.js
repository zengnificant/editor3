import getIndexByOffset from '@src/immutable/block/getIndexByOffset.js'
import { backspaceCommand } from '@src/command/backspace.js'
import { isSelectionAtStartOfContent, isSelectionAtStartOfBlock } from './check.js'



export const backspaceBlockCommand = (content, sel) => {
    const { start, startKey, isCollapsed } = sel
    const block = content.getBlockForKey(startKey)
    const selectionAtStartOfContent = isSelectionAtStartOfContent(content, sel)
    const exception = selectionAtStartOfContent && !block.isEmpty()


    const getRet = () => {
        const sel2 = sel.merge({ a: 0, b: 0, aKey: startKey, bKey: startKey, isBackward: true })
        const content2 = content.setIn(['blockMap', startKey], block.createEmptyBlock())
        return { content: content2, selection: sel2 }
    }

    if (exception) {
        return getRet()
    }

    if (!isCollapsed || selectionAtStartOfContent || isSelectionAtStartOfBlock(content, sel)) {
        return backspaceCommand(content, sel)
    }
    return getRet()

}