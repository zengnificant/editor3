import { createActions } from 'redux-actions'
import { EditorState } from '@src/immutable/index.js'
import { deleteCommand as deleteCommand2 } from '@src/command/delete.js'
import { is } from 'immutable'

export const { deleteCommand } = createActions({
    deleteCommand: state => {
        let { content, selection, undoStack } = state

        let ret = deleteCommand2(content, selection);
        if (!is(content, ret.content)) {
            undoStack = undoStack.unshift(EditorState.create({ content, selection }))
        }

        return { ...state, ...ret, undoStack }
    },
})