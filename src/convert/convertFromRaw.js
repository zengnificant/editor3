import { Meta } from '@src/immutable/index.js'
import BlockMapBuilder from '@src/immutable/BlockMapBuilder.js'
import { Block, Content, Decorator } from '@src/immutable/index.js'
import { List } from 'immutable'
import throwError from '@nifi/utils/throwError.js'


const convertList = list => {

    return list.map(inline => {
        const { decoratorTree, text } = inline

        const newDecoratorTree = decoratorTree.map(decorator => Decorator.create(decorator))
        const newDecoratorTreeList = List(newDecoratorTree)
        if (!text.length) {
            return List().push(Meta.create({ text: '', decoratorTree: newDecoratorTreeList }))
        }
        return List(text.match(/./usg).map(e => Meta.create({ text: e, decoratorTree: newDecoratorTreeList })))

    })

}
const convertRawblock = (block) => {
    const list = List(convertList(block.list)).reduce((ac, el) => {
        return List.isList(el) ? ac.concat(el) : ac.push(el)
    }, List())

    const ret = { list }

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
    console.log(blockList)
    const blockMap = BlockMapBuilder.createFromArray(blockList, true)

    return Content.create({ blockMap })
}