import { getAction } from '@src/handlers/keyCommandBindings/getAction.js'
const handleOnClick = (e, state) => {
    getAction(state.onClick(state))
}

export default handleOnClick