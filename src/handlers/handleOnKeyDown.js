import { getKeyCommand, handleOnKeyCommand } from '@src/handlers/keyCommandBindings/index.js'

function handleOnKeyDown(e, state, keyBinding) {
    if (!keyBinding) {
        keyBinding = getKeyCommand
    }

    let command = keyBinding(e) || getKeyCommand(e)

    if (command) {
        e.preventDefault()
        return handleOnKeyCommand(command, state)
    }
    return state
}


export default handleOnKeyDown