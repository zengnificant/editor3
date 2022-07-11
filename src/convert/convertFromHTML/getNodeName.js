const getNodeName = node => {
    let nodeName = node.nodeName.toLowerCase()
    if (nodeName === 'body') {
        return 'div'
    }
    if (nodeName === 'ol' || nodeName === 'ul') {
        return "span"
    }
    if (nodeName === 'li') {
        nodeName = node.parentNode.nodeName.toLowerCase()
        if (nodeName != 'ul' && nodeName != 'ol') {
            nodeName = "ul"
        }
    }

    return nodeName
}


export default getNodeName