1.  `\n<ul><li>test</li></ul>`  这种结构，chrome下 选择区域在列表最开始位置，compositionMode 时输入文字有奇怪表现  

2.compositionMode 时输入文字有奇怪表现   解决方法  给根节点设置key值,先强制更新key 再更新其他。同时  preventDefault()  但是方法还是有bug  就是`!selection.isCollapsed`状态下 且选择区域不止2个block时发生错误。虽然可以靠禁止此种情况。
完美解决办法：`!selection.isCollapsed`状态下，compositionStart 阶段，就进行删除选中区域命令，onChange(backspaceCommand(...))。这时不需要在根节点设置key值强制，然后强制更新key。



2.  使用keydown  不用使用keyup;   keydown会有默认行为

3.  长按delete   ul键

4.  immutable     Record的  键 不能有 size ; Record衍生class  不能  设  `get  size(){}`
5.  inlineStyles  是OrderedMap  注意不要带入成Object。
6.  defaultRecord  遵循 object  null,   字符串  undefined
