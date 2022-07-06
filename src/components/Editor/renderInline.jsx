import React, { Component, Fragment, createRef } from 'react'
import ReactDOM from 'react-dom'
import getInlineFromBlock from '@src/immutable/block/getInlineList.js'
import { Meta } from '@src/immutable/index.js'




const renderInline = (block) => {
    if (block.isEmpty()) {
        return <span data-index={0}>
            <br  data-text={true}/>
            </span>
    }
    const blockKey = block.getKey()
    const renderInlineFromList = (list, k) => {
        const getKey = () => `${blockKey}&&${k}`


        const firstEl = list.first()
        const data = firstEl.getData().toJS()
        const Tag = firstEl.getTag()
        const className = firstEl.getClassName().join(' ')

        const inlineStyles = firstEl.getInlineStyles().toJS()


        if (Meta.isDimen(firstEl)) {
            return className ?
                <span key={getKey()} data-index={k} className={className} style={inlineStyles}>
            <Tag {...data}  />
            </span> :
                <span key={getKey()} data-index={k}  style={inlineStyles}>
            <Tag {...data}  />
            </span>
        }

        const Text = list.map(e => e.getText()).join('')
        return className ?
            <Tag {...data} data-index={k} data-text={true}  key={getKey()} className={className} style={inlineStyles}>
   {Text}
   </Tag> :
            <Tag {...data} data-index={k} data-text={true} key={getKey()}  style={inlineStyles}>
   {Text}
   </Tag>
    }


    const inlines = getInlineFromBlock(block)
    const inlines2 = inlines.map(renderInlineFromList)
    return <Fragment>
        {inlines2}
    </Fragment>


}

export default renderInline