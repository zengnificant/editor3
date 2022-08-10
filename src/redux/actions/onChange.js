import { createActions } from 'redux-actions'
import { EditorState } from '@src/immutable/index.js'
import { is } from 'immutable'

export const { onChange } = createActions({
    onChange: function(state, opts) {
        let { content, selection, undoStack } = state

        let ret = { ...state, ...opts }
        if (!is(content, ret.content)) {

            undoStack = undoStack.unshift(EditorState.create({ content, selection }))
        }
        return { ...ret, undoStack }
    }
})