import { handleActions } from 'redux-actions'
import {
    moveSelectionToEndOfBlockCommand,
    moveSelectionToStartOfBlockCommand,
    deleteCommand,
    backspaceBlockCommand,
    backspaceCommand,
    splitCommand,
    selectAllCommand,
    redoCommand,
    undoCommand,
    onClick,
    onChange,
    insertText,
    forceUpdate,
    forceUpdate2
} from '@redux/actions/index.js'

import initState from '@redux/store/initState.js'

import setEditorSelection from '@src/selection/setEditorSelection.js'



const actions = {};
[moveSelectionToEndOfBlockCommand,
    moveSelectionToStartOfBlockCommand,
    deleteCommand,
    backspaceBlockCommand,
    backspaceCommand,
    splitCommand,
    selectAllCommand,
    redoCommand,
    undoCommand,
    onClick,
    onChange,
    insertText,
    forceUpdate,
    forceUpdate2
].map(fn => {
    actions[fn] = (state, { payload: newState }) => {
        return newState
    }
})


const reducer = handleActions(actions, initState)

export default reducer