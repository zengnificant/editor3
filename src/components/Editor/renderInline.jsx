import React, { Component, Fragment, createRef } from 'react'
import ReactDOM from 'react-dom'
import getInlineFromBlock from '@src/immutable/block/getInlineList.js'
import { Meta, Decorator } from '@src/immutable/index.js'
import { Map } from 'immutable'
import { INLINE_INDEX } from '@constants/arg.js'

import dealWithInlineList from '@src/immutable/block/dealWithInlineList.js'
import beautifyjs from 'js-beautify'
const beautify = js => beautifyjs.js(JSON.stringify(js))

function getComponentForDecorator(decorator) {
    const { baseType, tag, inlineStyles, className: classNameList, ...data } = decorator
    const Tag = tag
    const className = classNameList.join(' ')
    const style = inlineStyles
    return props => <Tag className={className}  style={style} {...data} {...props}/>
}
/*
{
        "decorator": {
            "inlineStyles": {},
            "className": [],
            "tag": "img",
            "src": "/src/logo.svg",
            "baseType": 1
        },
        "children": [{
            "decorator": {
                "text": "",
                "index": 1
            }
        }



*/

const renderChangedInlines = (inlines) => {
    return inlines.map((inline, k) => renderChangedInline(inline, k))
}

const getIndexData = (index) => {
    return {
        [INLINE_INDEX]: index }
}

function renderChangedInline(inline, k) {
    const decorator = inline.get('decorator').toJS()
    const { baseType, tag, inlineStyles, className: classNameList, ...data } = decorator

    const Tag = tag
    const className = classNameList.join(' ')
    const style = inlineStyles
    const El = props => <Tag className={className}  style={style} {...data} {...props}/>
    const children = inline.get('children')

    if (baseType != 0) {
        const index = children.getIn([0, "decorator", "index"])
        return <span {...getIndexData(index)} key={`${k}&&${index}`}>
           <El/>
           </span>
    }
    let childFirst = children.get(0)
    console.log('111', inline.toJS(), childFirst.toJS())
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
            <br  data-text={true}/>
            </span>
    }
    const blockKey = block.getKey()
    const renderInlineFromList = (list, k) => {
        const getKey = () => `${blockKey}&&${k}`


        const firstEl = list.first()
        const decorator = firstEl.getDecoratorTree().first().toJS()
        const Inline = getComponentForDecorator(decorator)


        if (decorator.baseType) {
            const Inline2 = getComponentForDecorator(firstEl.getDecoratorTree().get(1).toJS())
            return <Inline2 key={getKey()}  {...getIndexData(k)}>
            <Inline />
            </Inline2>
        }
        const Text = list.map(e => e.getText()).join('')
        return <Inline key={getKey()} {...getIndexData(k)}>{Text}</Inline>

    }


    const inlines = getInlineFromBlock(block)
    const testInlines = dealWithInlineList(inlines)

    console.log(beautify(testInlines.toJS()))
    // const inlines2 = inlines.map(renderInlineFromList)
    return <Fragment>
        {renderChangedInlines(testInlines)}
    </Fragment>


}

export default renderInline