import { List, is } from 'immutable'
import { Meta } from '@src/immutable/index.js'

const getInlineFromBlock = (block) => {
    return block.getList().reduce((ac, el, index) => {
        const decoratorTree = el.getDecoratorTree()
        if (index == 0 || decoratorTree.first().getBaseType()) {
            return ac.push(List([el]))
        }
        let curList = ac.last(),
            curLen = ac.size,
            curEl = curList.last()
        if (is(curEl.getDecoratorTree(), decoratorTree)) {

            curList = curList.push(el)
            ac = ac.set(curLen - 1, curList)
            return ac
        }
        return ac.push(List([el]))
    }, List())


}


export default getInlineFromBlock