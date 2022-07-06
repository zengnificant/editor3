import splitList from '@nifi/utils/splitList.js'
const convertBlocks = blocks => {
    return splitList(blocks, block => {
        return block.getTag() !== 'ul' && block.getTag() !== 'ol'
    })
}

export default convertBlocks