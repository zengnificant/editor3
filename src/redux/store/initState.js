import { Content, Selection } from '@src/immutable/index.js'
import { Stack } from 'immutable'
import { convertFromHTML } from '@convert/convertFromHTML.js'

const html = `<a class="ha halal" style="color:red;font-size:20px" href="#">   t t<div></div> <b style="color:green;font-size:30px;">nice</b></a><div>行内块<u>行内</u></div> 哈哈<span>t2</span><div>我很饿</div>我<img src="/src/logo.svg"/><li>我爱理<ul><li>爱理</ul><ul><li>爱理<ul><li>爱理<ul><li>爱理</li></ul><ol><li>爱理</li></ol><ol><li>爱理</li></ol></li></ul></li></ul></li>`

const content = convertFromHTML(html)

//const content = Content.createFromText('')
const selection = Selection.createAtEndOfContent(content)
const isInCompositionMode = false
const redoStack = Stack()
const undoStack = Stack()
const contentKey = 0
const keyMap = content.getBlockMap().map((_, k) => 0);

export default {
    content,
    selection,
    isInCompositionMode,
    redoStack,
    undoStack,
    contentKey,
    keyMap
}