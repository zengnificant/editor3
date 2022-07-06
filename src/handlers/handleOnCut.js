import getFragmentContent from '@src/transaction/getFragmentContent.js'
import { convertToHTML } from '@convert/convertToHTML.js'
import { backspaceCommand } from '@src/command/backspace.js'

const handleOnCut = (e, { content, selection }, onChange) => {
    console.log('handleOnCut')
    if (selection.isCollapsed) {
        return
    }
    const fragment = getFragmentContent(content, selection)
    const html = convertToHTML(fragment)
    const text = fragment.getText()
    e.clipboardData.setData('text/html', html)
    e.clipboardData.setData('text/plain', text)


    if (typeof onChange === 'function') onChange(backspaceCommand(content, selection))

}

export default handleOnCut