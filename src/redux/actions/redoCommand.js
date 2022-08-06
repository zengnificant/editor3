import { createActions } from 'redux-actions'
import { EditorState } from '@src/immutable/index.js'


export const { redoCommand } = createActions({
    redoCommand: state => {
        let { content, selection, redoStack, undoStack } = state
        if (!redoStack || !redoStack.size) {
            return state
        }
        undoStack = undoStack.unshift(EditorState.create({ content, selection }))

        const editorState = redoStack.peek()
        content = editorState.getContent()
        selection = editorState.getSelection()
        redoStack = redoStack.shift()

        return { ...state, content, selection, redoStack, undoStack }
    },
})