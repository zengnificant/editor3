import { OrderedMap } from 'immutable'

import Block from '@src/immutable/Block.js'




const BlockMapBuilder = {
    createFromArray: function(blocks, shouldReserveKey = true) {
        return OrderedMap(blocks.map((block) => {
            let newBlock = Block.create(block, shouldReserveKey)
            let key = newBlock.getKey()
            return [key, newBlock]
        }))
    },
};


export default BlockMapBuilder