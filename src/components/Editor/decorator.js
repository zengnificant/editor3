import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    moveSelectionToEndOfBlockCommand,
    moveSelectionToStartOfBlockCommand,
    deleteCommand,
    backspaceBlockCommand,
    backspaceCommand,
    splitCommand,
    selectAllCommand,
    redoCommand,
    undoCommand,
    onClick,
    onChange,
    insertText,
    forceUpdate,
    forceUpdate2
} from '@redux/actions/index.js'

const mapStateToProps = (state) => {
    return state
}


export default connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        moveSelectionToEndOfBlockCommand,
        moveSelectionToStartOfBlockCommand,
        deleteCommand,
        backspaceBlockCommand,
        backspaceCommand,
        splitCommand,
        selectAllCommand,
        redoCommand,
        undoCommand,
        insertText,
        onClick,
        onChange,
        forceUpdate,
        forceUpdate2
    }, dispatch)
)