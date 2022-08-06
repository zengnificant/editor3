import { createActions } from 'redux-actions'
import { EditorState } from '@src/immutable/index.js'
import { selectAllCommand as selectAllCommand2 } from '@src/command/selectAll.js'

export const { selectAllCommand } = createActions({
    selectAllCommand: state => {
        let { content, selection } = state

        let ret = selectAllCommand2(content, selection);

        return { ...state, ...ret }
    },
})