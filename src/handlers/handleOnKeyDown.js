import { getKeyCommand, handleOnKeyCommand } from '@src/handlers/keyCommandBindings/index.js'

function handleOnKeyDown(e, { content, selection }, onChange, keyBinding) {
    if (!keyBinding) {
        keyBinding = getKeyCommand
    }

    let command = keyBinding(e) || getKeyCommand(e)

    if (command) {
        e.preventDefault()
        handleOnKeyCommand(command, { content, selection }, onChange)
    }
}


export default handleOnKeyDown