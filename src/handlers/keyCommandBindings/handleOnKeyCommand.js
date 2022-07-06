import { isWindows } from './userAgent.js'
import { backspaceCommand } from '@src/command/backspace.js'
import { backspaceBlockCommand } from '@src/command/backspaceBlock.js'

import { splitCommand } from '@src/command/split.js'
import { deleteCommand } from '@src/command/delete.js'
import { insertText } from '@src/transaction/insertText.js'


const keyCommandBackspaceToEndOfBlock = ({ content, selection }, onChange) => {
    if (!selection.isCollapsed) {
        return;
    }
    const { startKey } = selection
    const block = content.getBlockForKey(startKey)
    const size = block.size;
    return onChange({ content, selection: selection.merge({ a: size, b: size }) })
}

const keyCommandBackspaceToStartOfBlock = ({ content, selection }, onChange) => {
    if (!selection.isCollapsed) {
        return;
    }
    return onChange({ content, selection: selection.merge({ a: 0, b: 0 }) })
}

function handleOnKeyCommand(command, { content, selection }, onChange) {
    switch (command) {
        case 'redo':
            return null;
        case 'undo':
            return null;
        case 'delete':

            return onChange(deleteCommand(content, selection));
            // case 'delete-word':
            //     return keyCommandDeleteWord(editorKey);

        case 'backspace':

            return onChange(backspaceCommand(content, selection));
        case 'backspace-block':
            return onChange(backspaceBlockCommand(content, selection))
            // case 'backspace-word':
            //     return keyCommandBackspaceWord(editorKey);
            // case 'backspace-to-start-of-line':
            //     return keyCommandBackspaceToStartOfLine(editorKey);
        case 'split-block':
            return onChange(splitCommand(content, selection));
        case 'insert-newinline':
            return onChange(insertText(content, selection, ''));
            // case 'transpose-characters':
            //     return keyCommandTransposeCharacters(editorKey);
        case 'move-selection-to-start-of-block':
            return keyCommandBackspaceToStartOfBlock({ content, selection }, onChange)
        case 'move-selection-to-end-of-block':
            return keyCommandBackspaceToEndOfBlock({ content, selection }, onChange)
            //     // case 'secondary-cut':
            //     return SecondaryClipboard.cut(tea);
            // case 'secondary-paste':
            //     return SecondaryClipboard.paste(tea);
        default:
            return;
    }
}

export default handleOnKeyCommand