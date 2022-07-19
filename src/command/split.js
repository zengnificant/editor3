import getIndexByOffset from '@src/immutable/block/getIndexByOffset.js'
import { backspaceOnRange } from './backspace.js'
import Block from '@src/immutable/Block.js'
import Meta from '@src/immutable/Meta.js'
import Selection from '@src/immutable/Selection.js'

const getSel = sel => {
    return sel.set('isBackward', true)
}

export const splitOnCollapse = (cnt, sel) => {
    const { start, startKey } = sel
    const block = cnt.getBlockForKey(startKey)
    const blockList = block.getList()
    const index = getIndexByOffset(block, start)
    const list1 = blockList.slice(0, index + 1)
    const list2 = blockList.slice(index + 1)
    const newBlock = block.set('list', list2).resetKey()
    const oldBlock = block.set('list', list1)
    const afterKey = newBlock.getKey()

    let content = cnt.setIn(['blockMap', startKey], oldBlock).addBlockAfterKey(startKey, newBlock)
    return { content, selection: Selection.createByKey(afterKey) }


}


const splitOnRange = (cnt, sel) => {
    const ret = backspaceOnRange(cnt, sel)
    ret.selection = getSel(ret.selection)
    const { content, selection } = ret
    return splitOnCollapse(content, selection)
}



export const splitCommand = (content, sel) => {
    const { isCollapsed } = sel
    if (isCollapsed) {
        return splitOnCollapse(content, sel)
    }
    return splitOnRange(content, sel)
}