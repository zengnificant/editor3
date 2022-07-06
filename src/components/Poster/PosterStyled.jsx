import styled from 'styled-components'

const Styled = styled.div `
color:#000;
 position: relative;
 background: #fff;

 *{ margin:0;}

 & .PosterContainer{
  background-color: rgba(255, 255, 255, 0);
  border-left: 0.1px solid transparent;
  position: relative;
  z-index: 1;
 }
 & .PosterContent{
  position: relative;
  /*outline: none;*/
  user-select: text;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 400px;
 height: 400px;
 padding:20px;

 }

 
& img{width: 200px;}
`
export default Styled