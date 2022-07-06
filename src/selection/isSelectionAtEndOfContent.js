import teaStore from '@component/store/teaStore.js'

function isSelectionAtEndOfContent(sel,content) {
    const tea = teaStore.get(editorKey)
 const selection = tea.getSelection()
 let size = tea.getIn(['content', 'children']).size
 let lastBlock = tea.getIn(['content', 'children', size - 1])
 while (lastBlock && lastBlock.getChildType() === 'block') {
     let size = lastBlock.getChildren().size
     lastBlock = lastBlock.getIn(['children', size - 1])
 }

 return selection.end === lastBlock.getLength() && lastBlock.getKey() === selection.endKey
}

export default isSelectionAtEndOfContent