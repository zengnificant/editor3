import getIndexByOffset from '@src/immutable/block/getIndexByOffset.js'
import { isSelectionAtStartOfContent, isSelectionAtStartOfBlock } from './check.js'



const backspaceOnCollapse = (content, sel) => {
    const { start, startKey } = sel
    const block = content.getBlockForKey(startKey)
    const blockList = block.getList()
    if (isSelectionAtStartOfContent(content, sel)) {
        return { content, selection: sel }
    }
    if (isSelectionAtStartOfBlock(content, sel)) {
        const beforeBlock = content.getBlockBeforeKey(startKey)
        const beforeBlockList = beforeBlock.getList()
        const beforeBlockKey = beforeBlock.getKey()
        const beforeBlock2 = beforeBlock.set('list', beforeBlockList.concat(blockList))
        const content2 = content.deleteIn(['blockMap', startKey]).setIn(['blockMap', beforeBlockKey], beforeBlock2)
        const size = beforeBlock.size2
        const sel2 = sel.merge({ a: size, b: size, aKey: beforeBlockKey, bKey: beforeBlockKey, isBackward: false })
        return { content: content2, selection: sel2 }
    }
    if (blockList.size === 0) {
        const beforeBlock = content.getBlockBeforeKey(startKey)
        const beforeKey = beforeBlock.getKey()
        const size = beforeBlock.size2
        const content2 = content.deleteIn(['blockMap', startKey])
        const sel2 = sel.merge({ a: size, b: size, aKey: startKey, bKey: startKey, isBackward: false })
        return { content: content2, selection: sel2 }
    }
    const index = getIndexByOffset(block, start)
    const size = blockList.get(index).size2
    const list2 = blockList.filterNot((v, i) => i === index)
    const block2 = block.set('list', list2)

    const sel2 = sel.merge({ a: start - size, b: start - size, aKey: startKey, bKey: startKey, isBackward: false })
    const content2 = content.setIn(['blockMap', startKey], block2)

    return { content: content2, selection: sel2 }

}


export const backspaceOnRange = (content, sel) => {
    const { start, startKey, end, endKey } = sel
    const startBlock = content.getBlockForKey(startKey)
    const startBlockList = startBlock.getList()
    const endBlock = content.getBlockForKey(endKey)
    const endBlockList = endBlock.getList()
    const index = getIndexByOffset(startBlock, start)

    const endIndex = getIndexByOffset(endBlock, end)
    const list = startBlockList.slice(0, index + 1).concat(endBlockList.slice(endIndex + 1))
    const block = startBlock.set('list', list)
    const content2 = content.setIn(['blockMap', startKey], block)
    const sel2 = sel.merge({ a: start, b: start, aKey: startKey, bKey: startKey, isBackward: true })
    if (startKey === endKey) {
        return { content: content2, selection: sel2 }
    }

    const blockMap1 = content2.getBlockMap().takeUntil((_, k) => k === startKey).set(startKey, block)



    let blockMap2 = content2.getBlockMap().skipUntil((_, k) => k === endKey).skip(1)
    let firstDepth = blockMap2.first() && blockMap2.first().getDepth()
    if (firstDepth != 0) {
        const shouldResetDepthOfBlockMap = blockMap2.takeUntil((_, k) => _.getDepth() == 0).map((v) => {
            const depth = v.getDepth() - firstDepth
            return v.set('depth', depth)
        })
        blockMap2 = blockMap2.merge(shouldResetDepthOfBlockMap)
    }


    const blockMap = blockMap1.merge(blockMap2)

    const _content = content2.set('blockMap', blockMap)
    return { content: _content, selection: sel2 }

}



export const backspaceCommand = (content, sel) => {
    const { isCollapsed } = sel
    if (isCollapsed) {
        return backspaceOnCollapse(content, sel)
    }
    return backspaceOnRange(content, sel)
}