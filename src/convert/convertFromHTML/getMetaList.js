//@es6
import { Map, OrderedMap, OrderedSet, List } from 'immutable'
import transformCssText from './transformCssText.js'
import getNodeName from './getNodeName.js'
import getNodeData from './getNodeData.js'

import { Decorator, Meta, Test } from '@src/immutable/index.js'

function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE
}

function isBr(node) {
    return getNodeName(node) === "br"
}

function isIMG(node) {
    return getNodeName(node) === 'img'
}

function isBaseNode(node) {
    return isBr(node) ||
        isTextNode(node) ||
        isIMG(node)
}

function isBlockNode(node) {
    return /^(p|div|ul|ol|h1|h2|h3|h4|h5|h6)$/.test(getNodeName(node))

}

function getValidTag(tag) {
    const tags = ['span', 'b', 'strong', 'i', 'u', 'img', 'radio', 'video']
    if (!tags.includes(tag)) {
        return "span"
    }
    return tag
}
const decorators = [getLinkDecorator]


function getLinkDecorator(node) {
    const tag = getNodeName(node)
    if (tag !== 'a') return
    const { href, alt } = node
    return Decorator.create({ href, alt, tag })
}

const getMetaListForText = (node) => {
    if (!isTextNode(node)) {
        return;
    }
    const pNode = node.parentNode
    const nodeName = getNodeName(pNode)
    const tag = getValidTag(nodeName)
    const data = getNodeData(pNode)
    const baseDecorator = Decorator.create({ tag }).merge(data)
    const decoratorTree = getDecoratorTree(pNode).unshift(baseDecorator)
    const MetaList = node.nodeValue.replace(/^ *(.*?) *$/s, '$1').match(/./usg).map(e =>
        Meta.create({ text: e, decoratorTree }))
    return List().concat(MetaList)
}
const getMetaListForBr = (node) => {
    if (getNodeName(node) !== 'br') return;
    const pNode = node.parentNode
    const nodeName = getNodeName(pNode)
    const tag = getValidTag(nodeName)
    const data = getNodeData(pNode)
    const baseDecorator = Decorator.create({ tag }).merge(data)
    const decoratorTree = getDecoratorTree(pNode).unshift(baseDecorator)
    const meta = Meta.create({ decoratorTree })
    return List().push(meta)
}


const getEmptyMetaList = () => {

    const decorator = Decorator.create({ tag: 'span' })
    const baseDecorator = Decorator.create({ tag: 'br' })
    const decoratorTree = List().push(baseDecorator, decorator)
    const meta = Meta.create({ decoratorTree })
    return List().push(meta)
}

const getMetaListForIMG = (node) => {
    const checkTag = getNodeName(node)

    if (checkTag !== 'img') {
        return;
    }
    const pNode = node.parentNode
    let data = getNodeData(node)
    if (!isBlockNode(pNode)) {
        data = getNodeData(pNode).merge(data)
    }
    const nodeName = getNodeName(pNode)
    const tag = getValidTag(nodeName)

    const src = node.getAttribute('src') ?? undefined
    const alt = node.getAttribute('alt') ?? undefined
    data = data.merge({ src, alt })

    const baseDecorator = Decorator.create({ tag: checkTag, baseType: 1 }).merge(data)
    const decoratorTree = getDecoratorTree(pNode).unshift(baseDecorator)
    const meta = Meta.create({ decoratorTree })
    return List().push(meta)
}



function findDecorators(node, decoratorFilters) {

    const myDecorators = []
    decoratorFilters.map(decorator1 => {
        let ret = decorator1(node)
        if (ret != null) {
            myDecorators.push(ret)
        }

    })
    return myDecorators
}

function getDecoratorTree(node) {
    let myDecorators = []
    while ((!isBlockNode(node))) {
        myDecorators = myDecorators.concat(findDecorators(node, decorators))
        node = node.parentNode
    }
    return List(myDecorators)
}

function getMetaList(node) {
    if (!isBaseNode(node)) return;


    if (isTextNode(node)) {
        return getMetaListForText(node)
    }
    if (isIMG(node)) {
        return getMetaListForIMG(node)
    }
    if (isBr(node)) return getMetaListForBr(node)
    return getEmptyMetaList()

}

export default getMetaList;