import { createActions } from 'redux-actions'
import { EditorState } from '@src/immutable/index.js'
import { splitCommand as splitCommand2 } from '@src/command/split.js'
import { is } from 'immutable'

export const { splitCommand } = createActions({
    splitCommand: state => {
        let { content, selection, undoStack } = state

        let ret = splitCommand2(content, selection);
        if (!is(content, ret.content)) {
            undoStack = undoStack.unshift(EditorState.create({ content, selection }))
        }
        return { ...state, ...ret, undoStack }
    },
})