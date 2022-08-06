import { createActions } from 'redux-actions'
import { moveSelectionToStartOfBlockCommand as moveSelectionToStartOfBlockCommand2 } from '@src/command/moveSelectionToStartOfBlock.js'

export const { moveSelectionToStartOfBlockCommand } = createActions({
    moveSelectionToStartOfBlockCommand: state => {
        let { content, selection } = state

        let ret = moveSelectionToStartOfBlockCommand2(content, selection);

        return { ...state, ...ret }
    },
})