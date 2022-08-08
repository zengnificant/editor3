import React, { Component, Fragment, createRef } from 'react'
import ReactDOM from 'react-dom'
import { BLOCK_KEY_NAME } from '@constants/arg.js'
import renderInline from './renderInline.jsx'
import splitList from '@nifi/utils/splitList.js'

import { List, is } from 'immutable'
import EditorBlock from './EditorBlock.jsx'

const convertBlocks = blocks => {
    return splitList(blocks, block => {
        return block.getTag() !== 'ul' && block.getTag() !== 'ol'
    })
}


const convertLi = blocks => {
    const blocks2 = splitList(blocks, block => block.getTag && block.getTag() === 'ul')
    return splitList(blocks2, block => List.isList(block))
}



function getNewList(list) {
    if (!List.isList(list)) return list
    const cacheIndex = []

    function getChildren(el) {
        let curIndex = list.findIndex(v => v === el)
        if (!cacheIndex.includes(curIndex)) cacheIndex.push(curIndex)
        const curChildren = list.slice(curIndex + 1).takeWhile((x, index) => {
            let check = x.depth - 1 == el.depth
            if (check) {
                cacheIndex.push(index)
            }
            return check
        })
        const children = curChildren.map(childEl => getChildren(childEl))
        if (children.size) {
            return el.set('children', children)
        }
        return el
    }

    return list.map((el, i) => {
        if (!cacheIndex.includes(i)) return getChildren(el)
    }).filter(el => el != null)
}




const renderBlock = (block) => {
    const blockKey = block.getKey()
    return <EditorBlock block={block}  key={block.getKey()}/>



}


export const renderLiList = (list, i) => {
    let list2 = convertLi(list)
    if (is(list2, list)) {

        const Tag = list.get(0).getTag()
        return <Tag key={Tag+list.get(0).getKey()}>
      {list.map(renderBlock)}
    </Tag>
    }
    return <Fragment key={'list'+i}>
     {list2.map(list=>{
        const Tag = list.get(0).getTag()
    return <Tag key={Tag+list.get(0).getKey()}>
      {list.map(renderBlock)}
    </Tag>

    })}
  </Fragment>

}

class App extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        const { content } = this.props
        const changedBlocks = convertBlocks(content.getBlocks())
            .map(el => getNewList(el))


        return <div>
        {changedBlocks.map((el,i)=>List.isList(el)?renderLiList(el,i):renderBlock(el))}
        </div>
    }
}








export default App