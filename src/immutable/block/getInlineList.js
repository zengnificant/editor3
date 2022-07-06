import { List, is } from 'immutable'
import { Meta } from '@src/immutable/index.js'

const getInlineFromBlock = (block) => {
    return block.getList().reduce((ac, el, index) => {
        if (index == 0 || Meta.isDimen(el)) {
            return ac.push(List([el]))
        }
        let curList = ac.last(),
            curLen = ac.size,
            curEl = curList.last()

        if (is(curEl.getInlineStyles(), el.getInlineStyles()) && is(curEl.getClassName(), el.getClassName()) && el.getTag() === curEl.getTag() && !Meta.isDimen(curEl)) {
            curList = curList.push(el)
            ac = ac.set(curLen - 1, curList)
            return ac
        }
        return ac.push(List([el]))
    }, List())


}


export default getInlineFromBlock