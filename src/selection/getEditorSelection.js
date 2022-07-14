import { Content, Selection } from '@src/immutable/index.js'
import { List } from 'immutable'
import getOffsetByIndex from '@src/immutable/block/getOffsetByIndex.js'
import { BLOCK_KEY_NAME } from '@constants/arg.js'
import { INLINE_INDEX } from '@constants/arg.js'

const isNull = (any) => {
    return any == null
}
const getSelection = (sel, gsel, content) => {
    const { anchorNode, anchorOffset, focusNode, focusOffset, isCollapsed } = gsel
    if (!anchorNode || !focusNode) {
        return sel
    }
    const pointA = getPoint(anchorNode, anchorOffset, content)
    const pointB = getPoint(focusNode, focusOffset, content)
    const a = pointA.offset;
    const aKey = pointA.key
    const b = pointB.offset
    const bKey = pointB.key
    const isBackward = getIsBackward()
    return sel.merge({ a, b, aKey, bKey, isBackward })

    function getIsBackward() {
        if (aKey === bKey) {
            if (isCollapsed) {
                return sel.getIsBackward()
            }
            return b < a
        }
        const keys = content.getBlockMap().keySeq().toList()

        const indexA = keys.findIndex(v => v === aKey)
        const indexB = keys.findIndex(v => v === bKey)

        return indexB < indexA
    }
}



function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE
}

function isBr(node) {
    return node.nodeName === "BR"
}

function isBlockNode(node) {
    return node.getAttribute && node.getAttribute(BLOCK_KEY_NAME)
}



function getLeafNode(node) {

    while (isTextNode(node) || isNull(node.getAttribute(INLINE_INDEX))) {
        node = node.parentNode
    }
    return node
}

function getBlockNodeFromLeafNode(node) {
    while (!isBlockNode(node)) {
        node = node.parentNode
    }
    return node
}


function getPoint(node, offset, content) {
    let leafNode, leafIndex, leafOffset, blockNode, blockKey, block;
    if (isBlockNode(node)) {
        blockKey = node.getAttribute(BLOCK_KEY_NAME)
        return { key: blockKey, offset: offset }
    }
    leafNode = getLeafNode(node)

    leafIndex = leafNode.getAttribute(INLINE_INDEX)
    blockNode = getBlockNodeFromLeafNode(leafNode)
    blockKey = blockNode.getAttribute(BLOCK_KEY_NAME)
    block = content.getBlockForKey(blockKey)
    leafOffset = getOffsetByIndex(block, parseInt(leafIndex))
    return { key: blockKey, offset: leafOffset + offset }
}




export default getSelection