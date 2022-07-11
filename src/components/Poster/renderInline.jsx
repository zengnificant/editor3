import React, { Component, Fragment, createRef } from 'react'
import ReactDOM from 'react-dom'
import getInlineFromBlock from '@src/immutable/block/getInlineList.js'
import { Meta } from '@src/immutable/index.js'

function getComponentForDecorator(decorator) {
    const { baseType, tag, inlineStyles, className: classNameList, ...data } = decorator
    const Tag = tag
    const className = classNameList.join(' ')
    const style = inlineStyles
    return props => <Tag className={className}  style={style} {...data} {...props}/>
}



const renderInline = (block) => {
    if (block.isEmpty()) {
        return <br/>
    }
    const blockKey = block.getKey()
    const renderInlineFromList = (list, k) => {
        const getKey = () => `${blockKey}&&${k}`


        const firstEl = list.first()
        const decorator = firstEl.getDecoratorTree().first().toJS()
        const Inline = getComponentForDecorator(decorator)

        if (decorator.baseType) {
            return <Inline key={getKey()} />
        }
        const Text = list.map(e => e.getText()).join('')
        return <Inline key={getKey()} >{Text}</Inline>

    }


    const inlines = getInlineFromBlock(block)
    const inlines2 = inlines.map(renderInlineFromList)
    return <Fragment>
        {inlines2}
    </Fragment>


}

export default renderInline