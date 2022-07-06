import { Meta } from '@src/immutable/index.js'
import { OrderedMap, fromJS } from 'immutable'
import transformCssText from './transformCssText.js'
import { convertFromRaw } from '@convert/convertFromRaw.js'
import splitArr from '@nifi/utils/splitArr.js'
import bueatifyjs from 'js-beautify'
const bueatify = bueatifyjs.js

const getNodeName = node => {
    let nodeName = node.nodeName.toLowerCase()
    if (nodeName === 'ol' || nodeName === 'ul') {
        return "span"
    }
    if (nodeName === 'li') {
        nodeName = node.parentNode.nodeName.toLowerCase()
        if (nodeName != 'ul' && nodeName != 'ol') {
            nodeName = "ul"
        }
    }

    return nodeName
}




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
    return convertFromRaw({ blocks: retBlocks })
}





function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE
}

function isBr(node) {
    return getNodeName(node) === "br"
}

function isDimen(node) {
    return /^(img|radio|video)$/.test(getNodeName(node))
}


function isBaseNode(node) {
    return isBr(node) ||
        isTextNode(node) ||
        isDimen(node)
}


function isBlockNode(node) {

    return /^(p|div|ul|ol|h1|h2|h3|h4|h5|h6)$/.test(getNodeName(node))

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



function traverseNode(node, depth = 0) {
    if (isBaseNode(node)) return traverseMetaNode(node)
    if (isBlockNode(node)) {
        let nextDepth = depth;
        if (getNodeName(node) === 'ol' || getNodeName(node) === 'ul') {
            nextDepth = depth + 1
        }

        const blockNodes = [...node.childNodes].map(node2 => traverseNode(node2, nextDepth))
        return { type: 'block', depth: depth, tag: getNodeName(node), list: flatternArray(blockNodes) }
    }


    const inlineNodes = [...node.childNodes].map(node => traverseNode(node, depth))
    return inlineNodes
}

function traverseLinkNode(node, depth = 0) {
    const childNodes = [...node.childNodes].map(node2 => traverseNode(node2, depth))

    const attrs = getAttrsForLinkNode(node)
    const getLinkFromList = (list) => ({ type: 'link', tag: getNodeName(node), list, ...attrs })
    let list = splitArr(flatternArray(childNodes), a => a.type === 'block')
    if (!list.find(e => !Array.isArray(e))) {
        return getLinkFromList(list)
    }
    let ret = []
    list.map(el => {
        if (Array.isArray(el)) {
            ret = ret.concat(getLinkFromList(el));
            return
        }
        const block = el;
        block.list = [getLinkFromList(block.list)]

        ret.push(block)


    })


    return ret;

}

function isLinkNode(node) {
    return getNodeName(node) === 'a'

}


function getAttrsForLinkNode(node) {
    const inlineStyles = transformCssText(node.style.cssText)
    const href = node.href;
    const className = [...node.classList]
    const data = { href }

    return { inlineStyles, className, data }
}

function traverseMetaNode(node) {

    if (isDimen(node)) { return traverseDimen(node) }

    return traverseText(node)
}

function traverseDimen(node) {
    const pNode = node.parentNode
    const className = [...pNode.classList]

    const inlineStyles = transformCssText(pNode.style.cssText)
    const tag = getValidTag(node.tagName.toLowerCase())
    const src = node.getAttribute('src')
    const alt = node.getAttribute('alt')
    const data = { src, alt }

    return [{ tag, className, inlineStyles, data }]
}



function getValidTag(tag) {
    const tags = ['span', 'b', 'strong', 'i', 'u', 'img', 'radio', 'video']
    if (!tags.includes(tag)) {
        return "span"
    }
    return tag
}

function traverseText(node) {
    console.log(node)
    const pNode = node.parentNode
    const className = [...pNode.classList]
    const inlineStyles = transformCssText(pNode.style.cssText)
    const tag = getValidTag(pNode.tagName.toLowerCase())
    let _text = tag === 'br' ? '' : node.nodeValue;
    const text = _text.replace(/^ *(.*?) *$/s, '$1')
    return { tag, text, className, inlineStyles }
}


export default traverseHTML