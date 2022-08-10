import styled from 'styled-components'

const Styled = styled.div `
color:#000;
 position: relative;
 background: #fff;
 display: flex;
 text-align: left;

 width: 1000px;
 margin:0 auto;
 & .EditorContainer{
  background-color: rgba(255, 255, 255, 0);
  border-left: 0.1px solid transparent;
  position: relative;
  z-index: 1;
 }
 & .EditorContent{
  position: relative;
  /*outline: none;*/
  user-select: text;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 400px;
 height: 400px;
 padding:20px;

 }
  & .EditorContent[contenteditable="true"]{
     -webkit-user-modify: read-write-plaintext-only;  
  }
  & .EditorBar{
    display: flex;
  }

 & .EditorBlock{
  position: relative;
 }
& img{width: 200px;}


& .EditorBar .active-color{color:#00a5fe;}
`
export default Styled