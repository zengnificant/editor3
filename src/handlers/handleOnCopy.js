import getFragmentContent from '@src/transaction/getFragmentContent.js'
import { convertToHTML } from '@convert/convertToHTML.js'

const handleOnCopy = (e, state) => {
    e.preventDefault()
    const { content, selection } = state
    if (selection.isCollapsed) {
        return
    }
    const fragment = getFragmentContent(content, selection)
    const html = convertToHTML(fragment)
    const text = fragment.getText()
    e.clipboardData.setData('text/html', html)
    e.clipboardData.setData('text/plain', text)
    console.log("已复制")

}

export default handleOnCopy