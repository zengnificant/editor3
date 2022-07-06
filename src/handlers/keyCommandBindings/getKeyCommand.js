import { isWindows } from './userAgent.js'
import { backspaceCommand } from '@src/command/backspace.js'
import { splitCommand } from '@src/command/split.js'
import { deleteCommand } from '@src/command/delete.js'
import { insertText } from '@src/transaction/insertText.js'
import KeyCode from '@constants/KeyCode.js'

function isCommandKey(e) {
    return isWindows() ? isCtrlKey(e) :
        !!e.metaKey && !e.altKey

}

function isCtrlKey(e) {
    return !!e.ctrlKey && !e.altKey;
}

function isShiftKey(e) {
    return !!e.shiftKey && !isCommandKey(e);
}



function getZCommand(e) {
    if (!isCommandKey(e)) {
        return null;
    }
    return e.shiftKey ? 'redo' : 'undo';
}


function getBackspaceCommand(e) {
    if (isCommandKey(e)) {
        return 'backspace-block';
    }
    return 'backspace';
}

function getDeleteCommand(e) {
    if (isCommandKey(e)) {
        return 'backspace-block';
    }
    return 'delete';
}

function getLeftCommand(e) {
    if (isCommandKey(e)) {
        return 'move-selection-to-start-of-block';
    }

}

function getRightCommand(e) {
    if (isCommandKey(e)) {
        return 'move-selection-to-end-of-block';
    }

}


function getKeyCommand(e) {

    switch (e.keyCode) {
        case 90: // Z
            return getZCommand(e) || null;
        case KeyCode.RETURN:
            return isShiftKey(e) ? 'insert-newinline' : 'split-block';
        case KeyCode.BACKSPACE:
            return getBackspaceCommand(e);
        case KeyCode.DELETE:
            return getDeleteCommand(e);
        case KeyCode.LEFT:
            return getLeftCommand(e);
        case KeyCode.RIGHT:
            return getRightCommand(e);
        default:
            return null;
    }

}




export default getKeyCommand