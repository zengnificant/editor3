import { Meta } from '@src/immutable/index.js'
import { OrderedMap, fromJS, Map, List } from 'immutable'
import { Block, Content, BlockMapBuilder } from '@src/immutable/index.js'
import transformCssText from './transformCssText.js'
import splitArr from '@nifi/utils/splitArr.js'
import splitList from '@nifi/utils/splitList.js'
import getNodeName from './getNodeName.js'

import getMetaList from './getMetaList.js'
import bueatifyjs from 'js-beautify'
const bueatify = bueatifyjs.js





function getSafeBodyFromHTML(html) {

    if (!DOMParser) return null;
    const parser = new DOMParser()
    if (!parser.parseFromString) return null;
    const doc = parser.parseFromString(html, 'text/html')
    return doc.getElementsByTagName('body')[0];
}

const createEmptyBlock = () => {
    return Block.create({ type: "block", depth: 0, tag: 'div', list: List() })
}

function splitListByBlock(arr) {
    return splitList(arr, v => v.get('type') === 'block')
}

function getBlocks(blocks) {
    const arr = splitListByBlock(blocks)
    const ret = arr.map(el => {
        if (List.isList(el)) {
            return createEmptyBlock().set('list', el)
        }
        return el
    }).map(flatternBlock)
    return flatternArray(ret)
}

function traverseHTML(html) {
    const doc = getSafeBodyFromHTML(html)
    let blocks = [...doc.childNodes].map(node => traverseNode(node))

    const flatternBlocks = flatternArray(blocks)

    const retBlocks = getBlocks(flatternBlocks).map(b => Block.create(b))
    const blockMap = BlockMapBuilder.createFromArray(retBlocks)
    return Content.create({ blockMap })

}





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

function getBaseNode(node) {
    if (isBaseNode(node)) return node
}

function isBlockNode(node) {

    return /^(p|div|ul|ol|h1|h2|h3|h4|h5|h6)$/.test(getNodeName(node))

}

function flatternArray(list) {
    let ret = List()
    list.map(el => {
        if (List.isList(el)) {
            ret = ret.concat(flatternArray(el))
            return;
        }
        ret = ret.push(el)
    })
    return ret
}

function flatternBlock(block) {
    const list = block.get('list')
    if (!list.find(el => el.get('type') === 'block')) {
        return block;
    }
    let ret = List();
    splitListByBlock(list).map(el => {
        if (List.isList(el)) {
            ret = ret.push(block.set('list', el))
            return
        }
        let curBlock = el;
        let blockOrList = flatternBlock(curBlock)
        ret = ret.concat(List.isList(blockOrList) ? blockOrList : List([blockOrList]))
    })
    return ret
}




function traverseNode(node, depth = 0) {
    if (isBaseNode(node)) {
        return getMetaList(node)
    }
    if (isBlockNode(node)) {
        let nextDepth = depth;
        if (getNodeName(node) === 'ol' || getNodeName(node) === 'ul') {
            nextDepth = depth + 1
        }

        const blockNodes = [...node.childNodes].map(node2 => traverseNode(node2, nextDepth))
        return Map({ type: 'block', depth, tag: getNodeName(node), list: List(flatternArray(blockNodes)) })
    }


    const inlineNodes = [...node.childNodes].map(node => traverseNode(node, depth))
    return List(inlineNodes)
}


const html = `<a class="ha halal" style="color:red;font-size:20px" href="#">   t t <div>行内块<u>行内</u></div> 哈哈<span>t2</span></a><div>我很饿</div>我<img src="/src/logo.svg"/><li>我爱理<ul><li>爱理</ul><ul><li>爱理<ul><li>爱理<ul><li>爱理</li></ul><ol><li>爱理</li></ol><ol><li>爱理</li></ol></li></ul></li></ul></li>`


export default traverseHTML