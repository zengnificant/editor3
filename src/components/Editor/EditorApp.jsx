import React, { Component, Fragment, createRef } from 'react'
import ReactDOM from 'react-dom'
import { Content, Selection, Meta, Block, EditorState } from '@src/immutable/index.js'

import { is, Map, fromJS, OrderedMap, List, Stack } from 'immutable'
import EditorStyled from './EditorStyled.jsx'
import EditorContent from './EditorContent.jsx'
import getEditorSelection from '@src/selection/getEditorSelection.js'
import img from '@src/logo.svg'
import getIndexByOffset from '@src/immutable/block/getIndexByOffset.js'
import getInlineByOffset from '@src/immutable/block/getInlineByOffset.js'
import { LEFT, RIGHT, UP, DOWN } from '@constants/KeyCode.js'
import { deleteCommand } from '@src/command/delete.js'
import { backspaceCommand } from '@src/command/backspace.js'
import { splitCommand } from '@src/command/split.js'

import { insertText } from '@src/transaction/insertText.js'
import insertFragmentIntoContent from '@src/transaction/insertFragmentIntoContent.js'

import getFragmentContent from '@src/transaction/getFragmentContent.js'
import { convertToRaw } from '@src/convert/convertToRaw.js'
import { convertFromRaw } from '@src/convert/convertFromRaw.js'
import setEditorSelection from '@src/selection/setEditorSelection.js'
import { convertFromHTML } from '@convert/convertFromHTML.js'
import raw from '@components/raw.json'
import beautifyjs from 'js-beautify'
import Poster from '@components/Poster/Poster.jsx'
import { convertToHTML } from '@convert/convertToHTML.js'
import handleOnCut from '@src/handlers/handleOnCut.js'
import handleOnClick from '@src/handlers/handleOnClick.js'

import handleOnCopy from '@src/handlers/handleOnCopy.js'
import handleOnPaste from '@src/handlers/handleOnPaste.js'
import handleOnKeyDown from '@src/handlers/handleOnKeyDown.js'

import decorator from './decorator.js'

import initState from '@redux/store/initState.js'

import { pipe } from '@nifi/helpers/pipe.js'

const beautify = js => beautifyjs.js(JSON.stringify(js))




// const content = doc2
//const rawContent = beautify(convertToRaw(content))

const html = `<a class="ha halal" style="color:red;font-size:20px" href="#">   t t <b style="color:green;font-size:30px;">nice</b></a><div>行内块<u>行内</u></div> 哈哈<span>t2</span><div>我很饿</div>我<img src="/src/logo.svg"/><li>我爱理<ul><li>爱理</ul><ul><li>爱理<ul><li>爱理<ul><li>爱理</li></ul><ol><li>爱理</li></ol><ol><li>爱理</li></ol></li></ul></li></ul></li>`
var content = convertFromHTML(html)
//var content1 = convertFromRaw(raw)
const rawContent = beautify(convertToRaw(content))
console.log(rawContent)
// 
//console.log(Content.is(content, content1))


const key = content.getFirstBlock().getKey()
const selection = Selection.createByKey(key)


const wait = (fn) => setTimeout(fn, 0)

class App extends Component {

    constructor(props) {
        super(props);

        this.editorRef = createRef()
        this.selection = null
        this.clipboard = null
        this.compositionMode = false


    }
    getCurrentState() {
        const selection = this.selection
        return { ...this.props, selection }
    }



    acceptSelection = (selection) => {
        if (selection) {
            this.selection = selection
        }
        const gsel = window.getSelection()
        this.selection = getEditorSelection(this.getCurrentState(), gsel)
    }
    forceSelection = (state) => {
        if (!state) state = this.props
        setEditorSelection(state);
        this.acceptSelection();
    }


    onClick = async (e) => {
        //避免cmd+A 再click的bug
        wait(() => {

            this.acceptSelection();
            const state = this.getCurrentState()


        })
    }


    onCopy = (e) => {

        handleOnCopy(e, this.getCurrentState())
    }
    onPaste = (e) => {

        handleOnPaste(e, this.getCurrentState())
    }

    onCut = (e) => {

        handleOnCut(e, this.getCurrentState())
    }

    onKeyUp = e => {
        switch (e.keyCode) {
            case LEFT:
                return this.acceptSelection(this.selection.set('isBackward', true))
            case RIGHT:
                return this.acceptSelection(this.selection.set('isBackward', false))
            case UP:
            case DOWN:
                return this.acceptSelection(this.selection.set('isBackward', false))
            default:

        }
    }
    onMouseUp = (e) => {
        console.log('onMouseUp')
        this.acceptSelection()
        console.log(this.selection.toJS())
    }


    onKeyDown = (e) => {
        handleOnKeyDown(e, this.getCurrentState())
        // if (is(state.content, _lastState.content) && !is(state.selection, _lastState.selection)) {
        //     setEditorSelection(state)
        // }
        // console.log(state.selection)
        // this.acceptSelection()
    }



    onBeforeInput = async (e) => {



        const text = e.data

        if (!text) return;
        e.preventDefault()
        const state = this.getCurrentState()
        const { insertText, forceUpdate, forceUpdate2 } = state
        const insertText2 = () => {
            return insertText(state, text, { color: 'red' });
        }

        if (this.compositionMode) {
            this.compositionMode = false

            pipe(insertText2())
                .pipe(forceUpdate2)

            return;

        }


        insertText2()
    }
    onCompositionStart = e => {
        e.preventDefault()
        this.compositionMode = true

        if (!this.selection.isCollapsed) {
            this.props.backspaceCommand(this.props)
        }
    }


    shouldComponentUpdate(nextProps, nextState) {

        const { content, contentKey } = this.props
        const { content: nextContent, contentKey: nextContentKey } = nextProps
        const check = !Content.is(nextContent, content) || contentKey != nextContentKey

        if (check) {
            return true;
        }
        this.forceSelection(nextProps)
        return false;

    }

    componentDidUpdate() {
        this.forceSelection()
    }

    componentWillUnmount() {
        this.selection = null
        this.compositionMode = null
        this.clipboard = null
    }


    render() {
        const { content, contentKey } = this.props
        console.log('contentKey ', contentKey)
        return <EditorStyled>
        <div className='EditorContainer' >
          <div
                className='EditorContent' 
                ref={this.editorRef}
                contentEditable={true} 
                 
                onClick={this.onClick}
                onKeyDown={this.onKeyDown}
                onKeyUp={this.onKeyUp}
                onMouseUp={this.onMouseUp}
                onBeforeInput={this.onBeforeInput}
                onCompositionStart={this.onCompositionStart}
                onCopy={this.onCopy}
                onCut={this.onCut}
                onPaste={this.onPaste}
               
           
          >
          <EditorContent content={content}  key={'EditorContent-'+contentKey}/>
          </div>

        </div>

        <Poster content={content}/>

        </EditorStyled>


    }
}



export default decorator(App)