import React, { Component, Fragment, createRef } from 'react'
import ReactDOM from 'react-dom'
import { Content, Selection, Meta, Block } from '@src/immutable/index.js'

import { is, Map, fromJS, OrderedMap, List } from 'immutable'
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

import handleOnCopy from '@src/handlers/handleOnCopy.js'
import handleOnPaste from '@src/handlers/handleOnPaste.js'
import handleOnKeyDown from '@src/handlers/handleOnKeyDown.js'




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


const wait = (cb) => {
    setTimeout(cb, 0)
}

const delay = async (time) => {
    await setTimeout(null, time * 1000)
}


const testA = List([2, 1, 4, 7])
const testB = List([2, 1, 3, 4])
const testC = List([2, 1, 3, 4, 9, 6])



function changeA(a) {

    return a.reverse().reduce((ac, el, i) => {
            if (i == 0) {
                return ac.push(Map({ text: el }))
            }
            return List([Map({ text: el, children: ac })])
        },
        List())
}



function changeB(a, b) {
    let before = a.pop()
    let retA = a.last();
    const firstA = retA.get('text');
    const firstAChildren = retA.get('children');
    let retB = b.first()
    const firstB = retB.get('text');
    const firstBChildren = retB.get('children');
    let after = b.shift()

    if (is(firstA, firstB)) {
        if (!firstAChildren || !firstBChildren) {
            //let temp = retA.concat(retB)
            return a.concat(b)
        }

        let tempChildren = changeB(firstAChildren, firstBChildren)

        retA = retA.set('children', tempChildren)


        return before.push(retA).concat(after)
    }

    return a.concat(b)



}

const check = [changeA(testA), changeA(testB), changeA(testC)].reduce((a, b, i) => {
    if (i === 0) {
        return a;
    }

    return changeB(a, b)
}, changeA(testA))

//const test = changeB(changeA(testA), changeA(testB))

console.log(beautify(check.toJS()))


// function joinA(a, b) {
//     if (is(a, b)) return a;
//     let ret = List()

//     a.some((v, k) => {
//         if (is(v, b.get(k))) {
//             const restA = a.slice(k);
//             const restB = b.slice(k)
//             ret = ret.push(v)
//             return false;
//         }
//         ret = ret.push(List([a.slice(k), b.slice(k)]))
//         return true
//     })

//     return ret

// }



function joinArr(arr) {
    arr.map(el => List.isList(el) ? el : List.push(el))


    reduce((ac, el, i) => {
        if (i === o) { return ac.push(el) }

    }, List())
}



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content,
            selection,
            editorKey: 0

        }
        this.editorRef = createRef()
        this._selection = null
        this.clipboard = null
        this.compositionMode = false




    }
    restoreDOM(cb) {
        const { selection, content } = this.state
        this.setState({ editorKey: this.state.editorKey + 1 }, cb)
    }


    onChange = async ({ content, selection }, force = false) => {
        if (force) {
            return this.forceUpdate({ content, selection })
        }
        const sel = this._selection;
        const cnt = this.state.content
        if (!is(content, cnt)) {
            return this.setState({ content, selection }, () => {
                setEditorSelection(content, selection)
                this.acceptSelection(selection)
            })

        }

        if (!is(sel, selection)) {

            setEditorSelection(content, selection)
            this.acceptSelection(selection);
        }

    }
    forceUpdate = async ({ content, selection }) => {
        await this.restoreDOM()
        this.onChange({ content, selection })

    }

    acceptSelection = (sel) => {
        const { content } = this.state
        const gsel = window.getSelection()
        this._selection = getEditorSelection(sel, gsel, content)
        console.log(this._selection)
    }


    onClick = (e) => {
        const sel = this.state.selection
        this.acceptSelection(sel.set('isBackward', false))
        // const { content } = insertTextOnCollapse(this.state.content, this._selection, '我爱理')
        // console.log(content.getText())
    }

    onMouseUp = (e) => {

        const fn = () => {
            const sel = this.state.selection
            const cnt = this.state.content
            this.acceptSelection(sel)

            // const { content, selection } = insertFragmentIntoContent(cnt, this._selection, content1)
            // let dt = convertToRaw(content)

            // this.onChange({ content, selection }, () => {})
            // console.log(beautify(dt))

            // let nct = convertFromRaw(dt)
            // console.log(nct)

        }
        wait(fn)
        // this.onChange(content, () => {
        //     setEditorSelection(content, selection)
        // })
    }

    onCopy = (e) => {
        e.preventDefault()
        const { content } = this.state
        const selection = this._selection

        handleOnCopy(e, { content, selection })

    }
    onPaste = (e) => {
        e.preventDefault()
        const { content } = this.state
        const selection = this._selection
        handleOnPaste(e, { content, selection }, this.onChange)
    }

    onCut = (e) => {
        e.preventDefault()
        const { content } = this.state
        const selection = this._selection
        handleOnCut(e, { content, selection }, this.onChange)
    }

    onKeyUp = e => {
        switch (e.keyCode) {
            case LEFT:
                return this.acceptSelection(this._selection.set('isBackward', true))
            case RIGHT:
                console.log(window.getSelection())
                return this.acceptSelection(this._selection.set('isBackward', false))
            case UP:
            case DOWN:
                return this.acceptSelection(this._selection.set('isBackward', false))
            default:

        }
    }


    onKeyDown = (e) => {
        const sel = this._selection



        const { content } = this.state

        handleOnKeyDown(e, { content, selection: this._selection }, this.onChange)
    }



    onBeforeInput = async (e) => {


        const text = e.data
        if (!text) return;

        if (this.compositionMode) {
            this.compositionMode = false

            if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
                e.preventDefault();
                this.onChange(insertText(this.state.content, this._selection, text, { color: 'red' }));
                return
            }

            this.forceUpdate(insertText(this.state.content, this._selection, text, { color: 'red' }));
            return;

        }
        e.preventDefault()

        this.onChange(insertText(this.state.content, this._selection, text, { color: 'red' }));

    }
    onCompositionStart = e => {
        e.preventDefault()
        this.compositionMode = true
        const { content } = this.state

        if (!this._selection.isCollapsed) {
            this.onChange(backspaceCommand(content, this._selection))
        }
    }




    // shouldComponentUpdate(nextProps, nextState) {
    //     const nextContent = nextState.content
    //     const content = this.state.content
    //     return !is(nextContent, content)

    // }
    componentDidUpdate() {

    }

    componentWillUnmount() {
        this._selection = null
        this.compositionMode = null
    }


    render() {
        const content = this.state.content
        return <EditorStyled>
        <div className='EditorContainer' >
          <div
                className='EditorContent' 
                ref={this.editorRef}
                contentEditable={true} 
                 
                onClick={this.onClick}
                onMouseUp={this.onMouseUp}
                onKeyDown={this.onKeyDown}
                onKeyUp={this.onKeyUp}
                onBeforeInput={this.onBeforeInput}
                onCompositionStart={this.onCompositionStart}
                onCopy={this.onCopy}
                onCut={this.onCut}
                onPaste={this.onPaste}
               
           
          >
          <EditorContent content={content}  key={'EditorContent-'+this.state.editorKey}/>
          </div>

        </div>

        <Poster content={content}/>

        </EditorStyled>


    }


}

export default App