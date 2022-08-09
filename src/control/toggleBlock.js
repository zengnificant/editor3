import { OrderedMap } from 'immutable'
import getBlockTag from '@src/control/getBlockTag.js'
import { defaultBlockTag } from '@src/settings/index.js'
const toggleBlock = (state, tag = 'div') => {
    const lastTag = getBlockTag(state, true);
    let { selection, content } = state;

    const blocks = content.getBlocks(selection)
    console.log(blocks)
    const blockMap = content.getBlockMap()

    const retTag = getTag(lastTag, tag)

    const blockMap2 = OrderedMap(blocks.map(block => block.set('tag', retTag)).map(b => [b.getKey(), b]))
    content = content.set('blockMap', blockMap.merge(blockMap2)).normalizeDepths()
    return state.onChange({ ...state, content })

}



const getTag = (lastTag, tag) => {
    if (lastTag === tag) {
        return defaultBlockTag
    }
    return tag
}


export default toggleBlock