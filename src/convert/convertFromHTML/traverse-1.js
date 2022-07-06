import { Meta } from '@src/immutable/index.js'
import { OrderedMap, fromJS } from 'immutable'
import transformCssText from './transformCssText.js'
import { convertFromRaw } from '@convert/convertFromRaw.js'
import splitArr from '@nifi/utils/splitArr.js'
import bueatifyjs from 'js-beautify'
const bueatify = bueatifyjs.js

const getNodeName = node => node.nodeName.toLowerCase()


function getSafeBodyFromHTML(html) {

    if (!DOMParser) return null;
    const parser = new DOMParser()
    if (!parser.parseFromString) return null;
    const doc = parser.parseFromString(html, 'text/html')
    return doc.getElementsByTagName('body')[0];
}

const createEmptyBlock = () => {
    return { type: "block", depth: 0, tag: 'div', list: [] }
}

function splitArrByBlock(arr) {
    return splitArr(arr, v => v.type === 'block')
}

function getBlocks(blocks) {
    const arr = splitArrByBlock(blocks)

    const ret = arr.map(el => {
        if (Array.isArray(el)) {
            let emptyBlock = createEmptyBlock()
            emptyBlock.list = el
            return emptyBlock
        }
        return el
    }).map(flatternBlock)
    return flatternArray(ret)
}

function traverseHTML(html) {
    const doc = getSafeBodyFromHTML(html)
    let blocks = [...doc.childNodes].map(node => traverseNode(node, 0))
    const flatternBlocks = flatternArray(blocks)
    const retBlocks = getBlocks(flatternBlocks)
    console.log(bueatify(JSON.stringify(retBlocks)))
    return convertFromRaw({ blocks: retBlocks })
}

let doc2 = traverseHTML(`<a class="ha halal" style="color:red;font-size:20px">   t t <div>行内块<u>行内</u></div> 哈哈<span>t2</span></a> < div > 我很饿 < /div>\n<li>我爱理<ul><li>爱理</li > < /ul></li >`)



function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE
}

function isBr(node) {
    return node.nodeName === "BR"
}

function isDimen(node) {
    return /^(base|radio|video)$/.test(getNodeName(node))
}


function isBaseNode(node) {
    return isBr(node) ||
        isTextNode(node) ||
        isDimen(node)
}


function isBlockNode(node) {

    return /^(p|div|li|h1|h2|h3|h4|h5|h6)$/.test(getNodeName(node))

}


function flatternBlock(block) {
    if (!block.list.find(el => el.type === 'block')) {
        return block;
    }
    const immutableBlock = fromJS(block)
    let ret = [];
    splitArrByBlock(block.list).map(el => {
        if (Array.isArray(el)) {
            let curBlock = immutableBlock.toJS()
            curBlock.list = el
            ret.push(curBlock)
            return
        }
        let curBlock = el;
        let blocks = flatternBlock(curBlock)
        ret = ret.concat(blocks)
    })
    return ret
}


function flatternArray(arr) {
    let ret = []

    arr.map(el => {
        if (Array.isArray(el)) {
            ret = ret.concat(flatternArray(el))
            return;
        }
        ret.push(el)
    })



    return ret
}



// function traverseNode(node) {
//     if (isBaseNode(node)) return { type: 'meta', list: traverseMetaNode(node) }
//     if (isBlockNode(node)) {
//         const blockNodes = [...node.childNodes].map(node => traverseNode(node))
//         return { type: 'block', list: blockNodes }
//     }
//     const inlineNodes = [...node.childNodes].map(node => traverseNode(node))
//     return { type: 'inline', list: inlineNodes }
// }


function traverseNode(node, depth = 0) {

    if (isBaseNode(node)) return traverseMetaNode(node)
    if (isBlockNode(node)) {
        let nextDepth = depth;
        if (getNodeName(node) === 'li') { nextDepth = depth + 1 }
        const blockNodes = [...node.childNodes].map(node => traverseNode(node, nextDepth))
        return { type: 'block', depth: depth, tag: getNodeName(node), list: flatternArray(blockNodes) }
    }
    const inlineNodes = [...node.childNodes].map(node => traverseNode(node, depth))
    return inlineNodes
}

function traverseMetaNode(node) {
    if (isDimen(node)) return traverseDimen(node)
    return traverseText(node)
}

function traverseDimen(node) {
    const pNode = node.parentNode
    const className = [...pNode.classList]

    const inlineStyles = transformCssText(pNode.style.cssText)
    const tag = getValidTag(pNode.tagName.toLowerCase())
    const src = pNode.getAttribute('src')
    const alt = pNode.getAttribute('alt')
    const data = { src, alt }
    return [{ type: 'meta', tag, className, inlineStyles, ...data }]
}



function getValidTag(tag) {
    const tags = ['span', 'b', 'strong', 'i', 'u']
    if (!tags.includes(tag)) {
        return "span"
    }
    return tag
}

function traverseText(node) {


    const pNode = node.parentNode
    const className = [...pNode.classList]
    const inlineStyles = transformCssText(pNode.style.cssText)
    const tag = getValidTag(pNode.tagName.toLowerCase())
    let _text = tag === 'br' ? '' : node.nodeValue;
    return _text.replace(/^ *(.*?) *$/s, '$1').match(/./usg).map(text => ({ type: 'meta', tag, text, className, inlineStyles }))

}


export default doc2