import removeMark from '@src/control/removeMark.js'
import pipe from '@nifi/helpers/pipe.js'
import Decorator from '@src/immutable/Decorator.js'
const addMark = (state, mark, opts = {}) => {
    return pipe(removeMark(state, mark))
        .pipe(state2 => addPureMark(state2, mark, opts))
}

export const addPureMark = (state, mark, opts = {}) => {
    let { selection, content } = state;
    const { isCollapsed } = selection;
    if (isCollapsed) return state.onChange(state);


    const { startKey, endKey, start, end } = selection;
    let blockA = content.getBlockForKey(startKey)

    if (startKey === endKey) {
        blockA = addMarkForBlock(blockA, mark, opts, [start, end])
        content = content.updateBlock(blockA)
        return state.onChange(state, { content })

    }
    let blocks = content.getBlocks(selection)
    blocks = blocks.map((block, index) => {
        if (index === 0) return addMarkForBlock(block, mark, opts, [start, block.size2])
        if (index === blocks.size - 1) return addMarkForBlock(block, mark, opts, [0, end])
        return addMarkForBlock(block, mark, opts, [0, block.size2])
    })

    content = content.updateBlocks(blocks)
    return state.onChange(state, { content })

}


const addMarkForMeta = (meta, mark, opts) => {
    const decorator = Decorator.create({ tag: mark, ...opts })
    const decoratorTree = meta.getDecoratorTree()
    const findOne = decoratorTree.find(d => d.getTag() === decorator.getTag())
    if (findOne) {
        let index = decoratorTree.findIndex(decorator => decorator === findOne);
        let newOne = findOne.merge(decorator)
        return meta.set('decoratorTree', decoratorTree.set(index, newOne))
    }
    return meta.set('decoratorTree', decoratorTree.push(decorator))
}

const addMarkForMetaList = (list, mark, opts) => {
    return list.map(meta => addMarkForMeta(meta, mark, opts))
}

const addMarkForBlock = (block, tag, opts, range = [0, 0]) => {
    const [start, end] = range

    const indexA = block.getIndexByOffset(start)
    const indexB = block.getIndexByOffset(end)
    const blockList = block.getList()
    const metaList = addMarkForMetaList(blockList.slice(indexA + 1, indexB + 1), tag, opts);
    const retList = blockList.slice(0, indexA + 1).concat(metaList).concat(blockList.slice(indexB + 1))
    return block.set('list', retList)
}



export default addMark