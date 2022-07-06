import { Meta } from '@src/immutable/index.js'
import BlockMapBuilder from '@src/immutable/BlockMapBuilder.js'
import { Block, Content } from '@src/immutable/index.js'
import { List } from 'immutable'
const isDimen = (obj) => {
    return obj && /^(img|radio|video)$/.test(obj['tag'])
}


const convertList = list => {
    return list.map(inline => {
        if (!inline.hasOwnProperty('text')) {
            inline.list = convertList(inline.list)
            return List([inline])
        }
        if (isDimen(inline)) {

            return List([Meta.create(inline)])
        }

        let { text, ...rest } = inline

        const list2 = text ?
            List(text.match(/./usg).map(e => Meta.create({ text: e, ...rest }))) :
            List(Meta.create({ ...rest }))

        return list2
    })

}
const convertRawblock = (block) => {
    const list = convertList(block.list).reduce((ac, el) => { return ac.concat(el) }, List())
    const ret = { list: List(list) }

    const { tag, depth } = block
    if (tag) {
        ret['tag'] = tag
    }
    if (depth) {
        ret['depth'] = depth
    }

    return ret

}




export const convertFromRaw = (rawContent) => {
    const { blocks } = rawContent
    const blockList = blocks.map(block => convertRawblock(block))
    const blockMap = BlockMapBuilder.createFromArray(blockList, true)

    return Content.create({ blockMap })
}