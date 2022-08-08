import { List, is, OrderedMap } from 'immutable'
import { Meta } from '@src/immutable/index.js'
import splitList from '@nifi/utils/splitList.js'

import { sameTypeOfBlocks } from '@src/settings/index.js'




const normalize = (content) => {
    const blocks = content.getBlocks()

    const condition = block => {
        const curDepth = block.getDepth()
        if (curDepth == 0) return true;
        let beforeDepth = 0
        const curKey = block.getKey()

        const beforeBlock = content.getBlockBeforeKey(curKey);

        if (!beforeBlock) {
            return false;
        }

        return isNormalDepth(beforeBlock, block)
    }

    const filterblocks = splitList(blocks, block => !condition(block)).filter(el => !List.isList(el))
    if (!filterblocks.size) {
        return content;
    }

    const fixedBlocksList = filterblocks.map(block => {
        const ret1 = blocks.skipUntil(b => is(b, block))
        const retBlocks = ret1.takeWhile((b, index) => {
            if (index === 0) return true;
            const lastB = ret1.get(index - 1)
            return isNormalDepth(lastB, b)
        })
        const firstBDepth = retBlocks.get(0).getDepth()
        return retBlocks.map(b => {
            return b.set('depth', b.getDepth() - firstBDepth)
        })
    }).flatten(true)
    const fixedBlockMap = OrderedMap(fixedBlocksList.map(b => [b.getKey(), b]))
    const blockMap = content.getBlockMap().merge(fixedBlockMap)
    return content.set('blockMap', blockMap)

}

function isSameTypeTag(a, b) {
    let tagA = a.getTag()
    let tagB = b.getTag()
    if (tagA === tagB) return true
    return !!sameTypeOfBlocks.find(arr => {
        return Array.isArray(arr) && arr.includes(tagA) && arr.includes(tagB)
    })
}

function isNormalDepth(a, b) {
    let compare = isSameTypeTag(a, b) ? 1 : 0
    const depthA = a.getDepth()
    const depthB = b.getDepth()
    if (depthB - depthA <= compare) return true;
    return false;
}


export default normalize