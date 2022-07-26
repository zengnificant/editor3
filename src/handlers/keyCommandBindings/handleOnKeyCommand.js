function handleOnKeyCommand(command, state) {
    const { content, selection } = state
    switch (command) {
        case 'redo':
            return state.redoCommand(state);
        case 'undo':
            return state.undoCommand(state);
        case 'delete':

            return state.deleteCommand(state);
            // case 'delete-word':
            //     return keyCommandDeleteWord(editorKey);

        case 'backspace':

            return state.backspaceCommand(state);
        case 'backspace-block':
            return state.backspaceBlockCommand(state);
            // case 'backspace-word':
            //     return keyCommandBackspaceWord(editorKey);
            // case 'backspace-to-start-of-line':
            //     return keyCommandBackspaceToStartOfLine(editorKey);
        case 'split-block':
            return state.splitCommand(state);
        case 'insert-newinline':
            return state.insertText(state, '');
            // case 'transpose-characters':
            //     return keyCommandTransposeCharacters(editorKey);
        case 'move-selection-to-start-of-block':
            return state.moveSelectionToStartOfBlockCommand(state)
        case 'move-selection-to-end-of-block':
            return state.moveSelectionToEndOfBlockCommand(state)

            //     // case 'secondary-cut':
            //     return SecondaryClipboard.cut(tea);
            // case 'secondary-paste':
            //     return SecondaryClipboard.paste(tea);
        case 'select-all':
            return state.selectAllCommand(state)
        default:
            return;
    }
}

export default handleOnKeyCommand