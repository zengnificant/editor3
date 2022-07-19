import getIndexByOffset from '@src/immutable/block/getIndexByOffset.js'
import { backspaceOnRange } from './backspace.js'

import { isSelectionAtEndOfContent, isSelectionAtEndOfBlock } from './check.js'


const getSel = sel => {
    return sel.set('isBackward', true)
}

export const deleteOnCollapse = (content, sel) => {

    const { start, startKey } = sel
    const block = content.getBlockForKey(startKey)
    const blockList = block.getList()
    if (isSelectionAtEndOfContent(content, sel)) {

        return { content, selection: getSel(sel) }
    }
    if (isSelectionAtEndOfBlock(content, sel)) {
        const afterBlock = content.getBlockAfterKey(startKey)
        const afterBlockList = afterBlock.getList()
        const afterBlockKey = afterBlock.getKey()

        const block2 = block.set('list', blockList.concat(afterBlockList))
        const content2 = content.deleteIn(['blockMap', afterBlockKey]).setIn(['blockMap', startKey], block2)
        const size = block.size2
        const sel2 = sel.merge({ a: size, b: size, aKey: startKey, bKey: startKey, isBackward: true })
        return { content: content2, selection: sel2 }
    }
    if (blockList.size === 0) {
        const afterBlock = content.getBlockAfterKey(startKey)
        const afterKey = afterBlock.getKey()
        const content2 = content.deleteIn(['blockMap', startKey])
        const sel2 = sel.merge({ a: 0, b: 0, aKey: afterKey, bKey: afterKey, isBackward: false })
        return { content: content2, selection: sel2 }
    }
    const index = getIndexByOffset(block, start)
    const size = blockList.get(index).size2
    const list2 = blockList.filterNot((v, i) => i === index + 1)
    const block2 = block.set('list', list2)
    const sel2 = sel.merge({ a: start, b: start, aKey: startKey, bKey: startKey, isBackward: true })
    const content2 = content.setIn(['blockMap', startKey], block2)

    return { content: content2, selection: sel2 }

}


const deleteOnRange = (content, sel) => {
    const ret = backspaceOnRange(content, sel)
    ret.selection = getSel(ret.selection)
    return ret
}



export const deleteCommand = (content, sel) => {
    const { isCollapsed } = sel
    if (isCollapsed) {
        return deleteOnCollapse(content, sel)
    }
    return deleteOnRange(content, sel)
}