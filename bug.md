1.  `\n<ul><li>test</li></ul>`  这种结构，chrome下 选择区域在列表最开始位置，compositionMode 时输入文字有奇怪表现  

2. compositionMode 时输入文字有奇怪表现   解决方法  给根节点设置key值,先强制更新key。同时  preventDefault() 。



3. 使用keydown  不用使用keyup;   keydown会有默认行为
4. node 是img ,range.setStart(node,1) 出错：Failed to execute 'setStart' on 'Range': There is no child at offset 1.
解决方法 ：range.setStart(node.parent,1)

5 onClick 之前cmd+A回导致window.getSelection()状态还是全选状态。 因此 在onClic函数体内
都使用setTimeout(fn,0),这时window.getSelection()状态恢复。