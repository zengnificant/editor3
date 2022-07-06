import { Content, Selection } from '@src/immutable/index.js'
import { List } from 'immutable'
import getOffsetByIndex from '@src/immutable/block/getOffsetByIndex.js'
import getInlineByOffset from '@src/immutable/block/getInlineByOffset.js'
import { BLOCK_KEY_NAME } from '@constants/arg.js'

const getPoint = (content, blockKey, offsetX) => {
    const node = document.querySelector(`[${BLOCK_KEY_NAME}=${blockKey}]`)
    const block = content.getBlockForKey(blockKey);
    const [index, offset] = getInlineByOffset(block, offsetX)
    const inlineNode = node.childNodes[index === -1 ? 0 : index]
    const baseNode = inlineNode.childNodes[0]
    return [baseNode, offset]

}


const setSelection = (content, selection) => {
    const { a, b, aKey, bKey, isBackward } = selection.toJS()
    const gsel = window.getSelection();
    gsel.removeAllRanges();
    const range = document.createRange();
    const PointA = getPoint(content, aKey, a)


    const PointB = getPoint(content, bKey, b)
    range.setStart(...PointA);
    range.setEnd(...PointB);

    gsel.addRange(range)
}





export default setSelection