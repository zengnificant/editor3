import { createActions } from 'redux-actions'
export const { forceUpdate2 } = createActions({
    forceUpdate2: (state) => {
        let { keyMap } = state
        let key = state.selection.startKey
        let count = keyMap.get(key)
        let start = count ? count : 0
        keyMap = keyMap.set(key, start + 1)
        return { ...state, keyMap }
    }
})