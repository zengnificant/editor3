 import teaStore from '@component/store/teaStore.js'
 import { getPoint } from '@component/selection/getEditorSelectionUtils.js'
 import insertFragmentIntoTea from '@component/modelutils/insertFragmentIntoTea.js'
 import Selection from '@immutable/Selection.js'
 import Content from '@immutable/Content.js'

 import Block from '@immutable/Block.js'

 import Damon from '@immutable/Damon.js'
 import { Map, List } from 'immutable'
 import Msg from '@component/message/'

 function getSelectionForEvent(event) {
     let node = null;
     let offset = null;
     const range0 = global.getSelection()
     if (typeof document.caretRangeFromPoint === 'function') {
         const dropRange = document.caretRangeFromPoint(event.x, event.y);
         node = dropRange.startContainer;
         offset = dropRange.startOffset;
         return { node, offset }
     } else if (event.rangeParent) {
         node = event.rangeParent;
         offset = event.rangeOffset;
     } else {
         return null;
     }
     // node = nullthrows(node);
     // offset = nullthrows(offset);
     // const offsetKey = nullthrows(findAncestorOffsetKey(node));
 }

 function handleFiles(files) {
     let err0 = '格式不支持，请上传以下格式的图片：.jpg, .jpeg, .png, .gif'
     let err = null;
     let rFiles = []
     files.forEach((file, i) => {
         if (!isValidType(file)) {
             err = err0
         } else {
             rFiles.push(file)
         }
     })
     if (rFiles.length > 0) {
         if (!err) {
             return getAsyncSrcForFiles(rFiles)
         } else {
             return { err: err0, async: getAsyncSrcForFiles(rFiles) }
         }
     }

     if (err) {
         return err
     }

 }

 function isValidType(file) {
     const types = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png']
     return types.includes(file.type)
 }


 function getAsyncSrcForFiles(files) {
     let asyncRets = []
     files.map(file => {

         let asyncRet = new Promise(resolve => {
             const reader = new FileReader();
             reader.onload = () => {
                 const src = reader.result;
                 resolve(src)
             };
             reader.readAsDataURL(file);
         })
         asyncRets.push(asyncRet)
     })

     return Promise.all(asyncRets)
 }



 Msg.config({ duration: 5 });

 function handleOnDrop(editorKey, e, onChange) {
     e.preventDefault()
     const data = e.nativeEvent.dataTransfer

     const tea = teaStore.get(editorKey)
     const selection = tea.getSelection()
     let { node, offset } = getSelectionForEvent(e.nativeEvent);
     let aPoint = getPoint(editorKey, node, offset)
     const newSel = Selection.createFromPoint(aPoint)

     const { types, files } = data
     const _files = [...files];
     if (_files.length > 0) {
         let ret = handleFiles(_files);
         if (!ret) return;

         if (typeof ret === 'string') {
             Msg.error(ret)
             return;
         }
         let asyncData;

         if (ret.err) {
             Msg.error(ret.err)
             asyncData = ret.async
         } else {
             asyncData = ret;
         }

         if (asyncData) {

             asyncData.then(srcArr => {
                 const blocks = List(srcArr.map(src => {
                     const damon = Damon.createWithKey({ data: Map({ src }) })
                     return Block.createFromDamon(damon)
                 }));
                 const fragment = new Content({ children: blocks })
                 let newTea2 = insertFragmentIntoTea(tea, fragment, newSel);

                 onChange(newTea2)

             })
         }
     }


 }


 export default handleOnDrop