import { List, OrderedMap } from 'immutable'
import getIndexByOffset from '@src/immutable/block/getIndexByOffset.js'
import { backspaceOnRange } from '@src/command/backspace.js'


const getFragmentContentOnRange = (content, sel) => {
    const { start, startKey, end, endKey } = sel
    if (startKey === endKey) {
        const block = content.getBlockForKey(startKey)
        const indexA = getIndexByOffset(block, start)
        const indexB = getIndexByOffset(block, end)
        const list = block.getList().slice(indexA + 1, indexB + 1)
        const newBlock = block.resetKey().set('list', list)
        const blockMap = OrderedMap({
            [newBlock.getKey()]: newBlock
        })
        return content.set("blockMap", blockMap)
    }
    const blockIndexA = content.getIndexForKey(startKey)
    const blockIndexB = content.getIndexForKey(endKey)
    const blockA = content.getBlockForKey(startKey)
    const indexA = getIndexByOffset(blockA, start)
    const newBlockA = blockA.set('list', blockA.getList().slice(indexA + 1))
    const blockB = content.getBlockForKey(endKey)
    const indexB = getIndexByOffset(blockB, end)
    const newBlockB = blockB.set('list', blockB.getList().slice(0, indexB + 1))
    const blockMap = content.getBlockMap().slice(blockIndexA, blockIndexB).set(startKey, newBlockA).set(endKey, newBlockB)
    const newContent = content.set("blockMap", blockMap).resetKeys()
    return newContent
}


const getFragmentContent = (content, selection) => {
    const { isCollapsed } = selection
    if (isCollapsed) {
        return content.set('blockMap', OrderedMap())
    }
    return getFragmentContentOnRange(content, selection)
}

export default getFragmentContent