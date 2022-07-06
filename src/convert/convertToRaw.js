import { Meta } from '@src/immutable/index.js'
import getInlineList from '@src/immutable/block/getInlineList.js'
const getRawInline = (inline) => {
    const firstInline = inline.first();
    if (Meta.isDimen(firstInline)) {

        return firstInline
    }
    const inlineStyles = firstInline.get('inlineStyles')
    const className = firstInline.get('className')
    const text = inline.reduce((ac, el) => {
        ac += el.getText()
        return ac
    }, '')
    const tag = firstInline.get('tag')
    return { text, className, inlineStyles, tag }
}

const getRawBlock = (block) => {
    const inlineList = getInlineList(block)
    const tag = block.getTag()
    const depth = block.getDepth()
    return { tag, depth, list: inlineList.map(inline => getRawInline(inline)) }
}


export const convertToRaw = (content) => {

    const blocks = content.getBlockMap().valueSeq().map(block => getRawBlock(block)).toJS()
    return { blocks }
}