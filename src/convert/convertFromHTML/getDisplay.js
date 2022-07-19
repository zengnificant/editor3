function getDisplay(node) {

    try {
        const documentBody = document.body;
        const cNode = node.cloneNode()
        documentBody.appendChild(cNode);
        const computed = getComputedStyle(cNode);
        setTimeout(() => documentBody.removeChild(cNode), 0);
        return computed.display
    } catch (e) {
        return ''
    }

}


export default getDisplay