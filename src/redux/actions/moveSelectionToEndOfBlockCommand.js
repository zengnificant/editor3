import { createActions } from 'redux-actions'
import { moveSelectionToEndOfBlockCommand as moveSelectionToEndOfBlockCommand2 } from '@src/command/moveSelectionToEndOfBlock.js'

export const { moveSelectionToEndOfBlockCommand } = createActions({
    moveSelectionToEndOfBlockCommand: state => {
        let { content, selection } = state

        let ret = moveSelectionToEndOfBlockCommand2(content, selection);

        return { ...state, ...ret }
    },
})