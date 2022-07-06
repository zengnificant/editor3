//@flow

function getSafeBodyFromHTML(html: string): ? Element {
  
    if(!DOMParser) return null;
    const parser=new DOMParser()
    if(!parser.parseFromString)  return null;
   const doc=parser.parseFromString(html,'text/html')
   return doc.getElementsByTagName('body')[0];
}


export default getSafeBodyFromHTML

