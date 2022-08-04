import { Meta } from '@src/immutable/index.js'
import { List, OrderedMap } from 'immutable'
import getIndexByOffset from '@src/immutable/block/getIndexByOffset.js'
import { backspaceOnRange } from '@src/command/backspace.js'

const insertIntoList = (list, toInsert, index) => {
    return list.slice(0, index + 1).concat(toInsert).concat(list.slice(index + 1))
}

const getDecoratorTree = (content, sel) => {
    const { start, startKey, isBackward, isCollapsed } = sel;
    if (!isCollapsed) return List()
    if (start === 0 && !isBackward) {
        return List()
    }
    const block = content.getBlockForKey(startKey)

    if (start === block.size2 && isBackward) {
        return List()
    }
    let index = getIndexByOffset(block, start)
    index = isBackward ? index + 1 : index;
    const meta = block.getList().get(index)
    return meta.getDecoratorTree()
}



export const insertTextOnCollapse = (content, sel, text, inlineStyles) => {

    inlineStyles = OrderedMap(inlineStyles)
    const isBackward = sel.getIsBackward()
    const { start, startKey } = sel
    const block = content.getBlockForKey(startKey)
    const index = getIndexByOffset(block, start)
    const blockList = block.getList()
    const decoratorTree = getDecoratorTree(content, sel)
    let list = List(text.match(/./usg)).map(text => {
        let meta = Meta.create({ text, decoratorTree })
        const { decorator } = meta
        return meta.setIn(['decoratorTree', 0], decorator.set('inlineStyles', decorator.getInlineStyles().merge(inlineStyles)))
    })

    const getlist = (list) => {
        return insertIntoList(blockList, list, index)
    }
    const componentKey = block.getComponentKey()

    const block2 = block.set('list', getlist(list).filter(e => !e.isEmpty()))
    return { content: content.updateBlock(block2), selection: sel.merge({ a: start + list.size, b: start + list.size }) }
}
export const insertTextOnRange = (con, sel, text, inlineStyles) => {
    let { content, selection } = backspaceOnRange(con, sel)
    return insertTextOnCollapse(content, selection.set('isBackward', false), text, inlineStyles)
}




export const insertText = (content, sel, text, inlineStyles) => {
    const { isCollapsed } = sel
    if (isCollapsed) {
        return insertTextOnCollapse(content, sel, text, inlineStyles)
    }
    return insertTextOnRange(content, sel, text, inlineStyles)
}