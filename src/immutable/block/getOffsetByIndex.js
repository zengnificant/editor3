import { List, is } from 'immutable'
import getInlineList from './getInlineList.js'

function getInlineListSize(block) {
    const list = getInlineList(block)
    return list.map((el, i) => {

        return el.reduce((ac, el2, i) => {


            ac += el2.size

            return ac

        }, 0)
    })

}
const getOffsetByIndex = (block, index) => {
    let offset = 0
    getInlineListSize(block)
        .map((size, i) => {

            if (i < index) {

                offset += size
            }

        })
    return offset
}


export default getOffsetByIndex