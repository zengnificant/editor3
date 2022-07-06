import { Meta } from '@src/immutable/index.js'
import { List } from 'immutable'
import getIndexByOffset from '@src/immutable/block/getIndexByOffset.js'
import { backspaceOnRange } from '@src/command/backspace.js'

const insertIntoList = (list, toInsert, index) => {
    return list.slice(0, index + 1).concat(toInsert).concat(list.slice(index + 1))
}
export const insertTextOnCollapse = (content, sel, text, inlineStyles) => {
    const isBackward = sel.getIsBackward()
    const { start, startKey } = sel
    const block = content.getBlockForKey(startKey)
    const index = getIndexByOffset(block, start)
    const blockList = block.getList()
    let list = List(text.match(/./usg)).map((text => Meta.create({ inlineStyles, text })))

    const getlist = (list) => {
        return insertIntoList(blockList, list, index)
    }

    const block2 = block.set('list', getlist(list).filter(e => !e.isEmpty()))
    return { content: content.updateBlock(block2), selection: sel.merge({ a: start + list.size, b: start + list.size }) }
}
export const insertTextOnRange = (con, sel, text, inlineStyles) => {
    let { content, selection } = backspaceOnRange(con, sel)
    return insertTextOnCollapse(content, selection.set('isBackward', true), text, inlineStyles)
}




export const insertText = (content, sel, text, inlineStyles) => {
    const { isCollapsed } = sel
    if (isCollapsed) {
        return insertTextOnCollapse(content, sel, text, inlineStyles)
    }
    return insertTextOnRange(content, sel, text, inlineStyles)
}