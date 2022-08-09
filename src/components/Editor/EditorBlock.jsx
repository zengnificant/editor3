import React, { Component, Fragment, createRef, useRef, useState, useEffect } from 'react'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BLOCK_KEY_NAME } from '@constants/arg.js'
import { forceUpdate2 } from '@redux/actions/index.js'
import { is } from 'immutable'


import renderInline from './renderInline.jsx'
import { renderLiList } from './EditorContent.jsx'

const mapStateToProps = (state, { block }) => {
    return { ...state, block }
}



const getTagForBlockTag = (tag) => {
    if (tag == 'ul' || tag == 'ol') {
        return 'li'
    }
    return tag
}



class App extends Component {


    shouldComponentUpdate(nextProps) {
        const { block, keyMap } = this.props
        const { block: block2, keyMap: keyMap2 } = nextProps
        const k = keyMap.get(block.getKey())
        const k2 = keyMap2.get(block2.getKey())
        return !is(block, block2) || k != k2
    }

    render() {
        const { block, keyMap } = this.props

        const blockKey = block.getKey()

        const dataKeyOBJ = {
            [BLOCK_KEY_NAME]: blockKey
        }
        const getKey = () => `${blockKey}+${keyMap.get(blockKey)}`

        const children = block.getChildren();
        const list = block.getList()
        const Tag = getTagForBlockTag(block.getTag())
        return <Tag className="EditorBlock"  data-block-depth={block.getDepth()}  key={getKey()} {...dataKeyOBJ}>
             {renderInline(block)}
             {children?renderLiList(children):null}
          </Tag>
    }

}

const decorator = connect(mapStateToProps)

export default decorator(App)