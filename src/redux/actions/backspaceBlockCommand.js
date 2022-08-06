import { createActions } from 'redux-actions'
import { EditorState } from '@src/immutable/index.js'
import { is } from 'immutable'

import { backspaceBlockCommand as backspaceBlockCommand2 } from '@src/command/backspaceBlock.js'

export const { backspaceBlockCommand } = createActions({
    backspaceBlockCommand: state => {
        let { content, selection, undoStack } = state

        let ret = backspaceBlockCommand2(content, selection);
        if (!is(content, ret.content)) {
            undoStack = undoStack.unshift(EditorState.create({ content, selection }))
        }
        return { ...state, ...ret, undoStack }
    },
})