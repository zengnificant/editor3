import { createActions } from 'redux-actions'
import { EditorState } from '@src/immutable/index.js'
import getEditorSelection from '@src/selection/getEditorSelection.js'
export const { onClick } = createActions({
    onClick: (state) => {
        const gsel = window.getSelection()
        const selection = getEditorSelection(state, gsel)
        return { ...state, selection }
    }
})