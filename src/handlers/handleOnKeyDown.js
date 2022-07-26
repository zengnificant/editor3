import { getKeyCommand, handleOnKeyCommand } from '@src/handlers/keyCommandBindings/index.js'

function handleOnKeyDown(e, state, keyBinding) {
    if (!keyBinding) {
        keyBinding = getKeyCommand
    }

    let command = keyBinding(e) || getKeyCommand(e)

    if (command) {
        e.preventDefault()
        handleOnKeyCommand(command, state)
    }
}


export default handleOnKeyDown