import { List, is } from 'immutable'
import getInlineList from './getInlineList.js'
const sumFn = (list) => {
    return list.reduce((a, b) => a + b)
}

function getIndexByOffset(block, offset) {
    const list = block.getList()

    const blockSize = block.size


    const numList = list.map(el => el.size)
    const ret = numList.map((v, i) => sumFn(numList.slice(0, i + 1)))
        .findIndex(v => v === offset)

    return ret



}





export default getIndexByOffset