import getFragmentContent from '@src/transaction/getFragmentContent.js'
import { convertToHTML } from '@convert/convertToHTML.js'

const handleOnCopy = (e, { content, selection }) => {
    if (selection.isCollapsed) {
        e.preventDefault()
        return
    }
    const fragment = getFragmentContent(content, selection)
    const html = convertToHTML(fragment)
    const text = fragment.getText()
    e.clipboardData.setData('text/html', html)
    e.clipboardData.setData('text/plain', text)

}

export default handleOnCopy