import React, { Component, Fragment, createRef } from 'react'
import ReactDOM from 'react-dom'
import { renderToString } from 'react-dom/server'

import getInlineFromBlock from '@src/immutable/block/getInlineList.js'
import { Meta, Decorator } from '@src/immutable/index.js'
import { Map } from 'immutable'
import { INLINE_INDEX } from '@constants/arg.js'

import dealWithInlineList from '@src/immutable/block/dealWithInlineList.js'
import beautifyjs from 'js-beautify'
const beautify = js => beautifyjs.js(JSON.stringify(js))

const renderChangedInlines = (inlines) => {
    return inlines.map((inline, k) => renderChangedInline(inline, k))
}

const getIndexData = (index) => {
    return {
        [INLINE_INDEX]: index
    }
}

function renderChangedInline(inline, k) {
    const decorator = inline.get('decorator').toJS()
    const { baseType, tag, inlineStyle, className: classNameList, ...data } = decorator

    const Tag = tag
    const className = classNameList.join(' ')
    const style = inlineStyle
    const El = props => <Tag className={className}  style={style} {...data} {...props}/>
    const children = inline.get('children')

    if (baseType != 0) {
        const index = children.getIn([0, "decorator", "index"])
        return <span {...getIndexData(index)} key={`${k}&&${index}`}>
           <El/>
           </span>
    }
    let childFirst = children.get(0)
    if (!Decorator.isDecorator(childFirst.get('decorator'))) {

        const index = children.getIn([0, "decorator", "index"])
        const text = children.getIn([0, "decorator", "text"])

        return <El key={`${k}&&${index}`} {...getIndexData(index)}>
            {text}
    </El>
    }

    return <El key={`${k}&&${Tag}`}>
            {
               renderChangedInlines(children)
            }
    </El>

}



const renderInline = (block) => {
    if (block.isEmpty()) {
        return <span {...getIndexData(0)}>
            <br />
            </span>

    }


    const inlines = getInlineFromBlock(block)
    const testInlines = dealWithInlineList(inlines)


    return <Fragment>
    {renderChangedInlines(testInlines)}
   </Fragment>

}

export default renderInline