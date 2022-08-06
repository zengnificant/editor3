import { createActions } from 'redux-actions'
import { EditorState } from '@src/immutable/index.js'
import { insertText as insertText2 } from '@src/transaction/insertText.js'
export const { insertText } = createActions({
    insertText: (state, text, inlineStyles) => {
        let { content, selection, undoStack } = state
        const ret = insertText2(content, selection, text, inlineStyles)
        undoStack = undoStack.unshift(EditorState.create({ content, selection }))
        return { ...state, ...ret, undoStack }
    }
})