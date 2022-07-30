import getFragmentContent from '@src/transaction/getFragmentContent.js'
import { convertToHTML } from '@convert/convertToHTML.js'
import { backspaceCommand } from '@src/command/backspace.js'
import { pipe } from '@nifi/helpers/pipe.js'


const handleOnCut = (e, state) => {
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

    state.backspaceCommand(state)

}

export default handleOnCut