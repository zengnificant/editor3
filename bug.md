
1.  `\n<ul><li>test</li></ul>`  这种结构，chrome下 选择区域在列表最开始位置，compositionMode 时输入文字有奇怪表现  

2. compositionMode 时输入文字有奇怪表现   解决方法  给根节点设置key值,先强制更新key。同时  preventDefault() 。

block节点为空的 safari 中无效。 因为默认行为是删除了block节点。同时 EditorContent 组件是Fragment  导致更新key对safari无效。当把key设置到父组件的div上后生效。



3. 使用keydown  不用使用keyup;   keydown会有默认行为
4. node 是img ,range.setStart(node,1) 出错：Failed to execute 'setStart' on 'Range': There is no child at offset 1.
解决方法 ：range.setStart(node.parent,1)

5 onClick 之前cmd+A回导致window.getSelection()状态还是全选状态。 因此 在onClic函数体内
都使用setTimeout(fn,0),这时window.getSelection()状态恢复。

6. 当前是每次更新后强制获得选择区域，但是当一次性进行多次操作时，只想最后操作完成时更新 选择区域怎么办？