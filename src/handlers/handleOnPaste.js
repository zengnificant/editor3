import { insertText } from '@src/transaction/insertText.js'
import insertFragmentIntoContent from '@src/transaction/insertFragmentIntoContent.js'
import { convertFromHTML } from '@convert/convertFromHTML.js'

function handleOnPaste(e, { content, selection }, onChange) {
    e.preventDefault()
    const data = e.clipboardData
    const { types, files } = data

    if (files.length > 0) {
        return;
    }



    if (types.length === 1 && (types[0] == 'Text' || types[0] == 'text/plain')) {
        const text = data.getData(types[0]);
        if (typeof onChange === 'function') onChange(insertText(content, selection, text));
        return;
    }
    if (isRichText(data)) {
        const fragment = convertFromHTML(data.getData('text/html'))
        if (typeof onChange === 'function') onChange(insertFragmentIntoContent(content, selection, fragment));
        return;
    }
}

function isRichText(data) {
    return data.types.includes('text/html')
}

export default handleOnPaste