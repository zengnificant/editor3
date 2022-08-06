import { createActions } from 'redux-actions'
export const { forceUpdate } = createActions({
    forceUpdate: (state) => {
        const { contentKey } = state
        return { ...state, contentKey: contentKey + 1 }
    }
})