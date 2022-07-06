import { List, is } from 'immutable'
import getInlineList from './getInlineList.js'
const sumFn = (list) => {
    return list.reduce((a, b) => a + b)
}

const getListSize = (li) => sumFn(li.map(el => el.size))



function getInlineByOffset(block, offset) {

    const list = block.getList()
    const inlineList = getInlineList(block)

    const inlineSizeList = inlineList.map(li => getListSize(li))
    const inlineSizeSumList = inlineSizeList.map((v, i) => sumFn(inlineSizeList.slice(0, i + 1)))
    const inlineIndex = inlineSizeSumList.findIndex(v => v >= offset)
    const inlineSizeSumList2 = inlineSizeSumList.unshift(0)
    const inlineOffset = offset - inlineSizeSumList2.get(inlineIndex)
    return [inlineIndex, inlineOffset]
}





export default getInlineByOffset