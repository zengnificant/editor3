import { createActions } from 'redux-actions'
import { EditorState } from '@src/immutable/index.js'


export const { undoCommand } = createActions({
    undoCommand: state => {
        let { content, selection, redoStack, undoStack } = state
        if (!undoStack || !undoStack.size) {
            return state
        }
        redoStack = redoStack.unshift(EditorState.create({ content, selection }))

        const editorState = undoStack.peek()
        content = editorState.getContent()
        selection = editorState.getSelection()
        undoStack = undoStack.shift()

        return { ...state, content, selection, redoStack, undoStack }
    },
})