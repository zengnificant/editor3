1.  `\n<ul><li>test</li></ul>`  这种结构，chrome下 选择区域在列表最开始位置，compositionMode 时输入文字有奇怪表现  

2. compositionMode 时输入文字有奇怪表现   解决方法  给根节点设置key值,先强制更新key 再更新其他。同时  preventDefault()  但是方法还是有bug  就是`!selection.isCollapsed`状态下 且选择区域不止2个block时发生错误。虽然可以靠禁止此种情况。
完美解决办法：`!selection.isCollapsed`状态下，compositionStart 阶段，就进行删除选中区域命令，onChange(backspaceCommand(...))。这时不需要在根节点设置key值强制，然后强制更新key。



3. 使用keydown  不用使用keyup;   keydown会有默认行为
4. node 是img ,range.setStart(node,1) 出错：Failed to execute 'setStart' on 'Range': There is no child at offset 1.
解决方法 ：range.setStart(node.parent,1)
