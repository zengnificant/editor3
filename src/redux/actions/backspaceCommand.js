import { createActions } from 'redux-actions'
import { EditorState } from '@src/immutable/index.js'
import { backspaceCommand as backspaceCommand2 } from '@src/command/backspace.js'
import { is } from 'immutable'

export const { backspaceCommand } = createActions({
    backspaceCommand: state => {
        let { content, selection, undoStack } = state

        let ret = backspaceCommand2(content, selection);
        if (!is(content, ret.content)) {
            undoStack = undoStack.unshift(EditorState.create({ content, selection }))
        }
        return { ...state, ...ret, undoStack }
    },
})