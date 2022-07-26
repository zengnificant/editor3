import { OrderedMap, is } from 'immutable'

import { StupidRecord } from '@nifi/helpers/StupidRecord.js'
import Block from '@src/immutable/Block.js'
import BlockMapBuilder from './BlockMapBuilder.js'




const defaultRecord = {
    blockMap: OrderedMap()
};

export default class Content extends StupidRecord(defaultRecord) {

    getText() {
        const blockMap = this.getBlockMap()
        if (!blockMap.size) {
            return ''
        }
        return blockMap.map(block => block.getText()).join('\n')
    }
    getBlocks() {
        return this.getBlockMap().valueSeq().toList()
    }
    updateBlock(block) {
        return this.setIn(['blockMap', block.getKey()], block)
    }

    resetKeys() {
        const blocks = this.getBlocks()
        const blockMap = BlockMapBuilder.createFromArray(blocks)
        return this.set('blockMap', blockMap)
    }


    getFirstBlock() {
        return this.getBlockMap().first()
    }

    getLastBlock() {
        return this.getBlockMap().last()
    }
    getBlockForKey(key) {
        return this.getBlockMap().get(key)
    }
    getIndexForKey(key) {
        return this.getBlockMap().keySeq().indexOf(key)
    }

    getBlockAfterKey(key) {
        return this.getBlockMap()
            .skipUntil((_, k) => k === key)
            .skip(1)
            .first();
    }

    getBlockBeforeKey(key) {
        return this.getBlockMap()
            .reverse()
            .skipUntil((_, k) => k === key)
            .skip(1)
            .first();
    }


    addBlockListBeforeKey(key, toBeAddedBlockList) {

        const toBeAddedBlockMap = BlockMapBuilder.createFromArray(toBeAddedBlockList)
        if (!toBeAddedBlockMap.size) {
            return this
        }
        const blockMap = this.getBlockMap()
        const map1 = blockMap.takeUntil((_, k) => k === key)
        const map2 = blockMap.skipUntil((_, k) => k === key)

        return this.set('blockMap', map1.concat(toBeAddedBlockMap).concat(map2))

    }
    addBlockBeforeKey(key, block) {
        const toBeAddedBlockList = [block]
        return addBlockListBeforeKey(key, toBeAddedBlockList)
    }
    addBlockListAfterKey(key, toBeAddedBlockList) {
        const toBeAddedBlockMap = BlockMapBuilder.createFromArray(toBeAddedBlockList)
        if (!toBeAddedBlockMap.size) {
            return this
        }
        const blockMap = this.getBlockMap()
        const nextBlock = this.getBlockAfterKey(key)
        if (!nextBlock) return this.set('blockMap', blockMap.concat(toBeAddedBlockMap))
        return this.addBlockListBeforeKey(nextBlock.getKey(), toBeAddedBlockList)

    }
    addBlockAfterKey(key, block) {
        const toBeAddedBlockList = [block]
        return this.addBlockListAfterKey(key, toBeAddedBlockList)
    }

    static isContent(content) {
        return content instanceof Content
    }
    static create(any) {
        return new Content(any)
    }

    static is(content, content2) {

        function getBlocksOfSameKey(content) {
            return content.getBlocks().map(block => block.set('key', 0))
        }
        return Content.isContent(content) &&
            Content.isContent(content2) && is(getBlocksOfSameKey(content), getBlocksOfSameKey(content2))

    }

    static createFromText(text, delimiter = /\r\n?|\n/g) {
        const blockTexts = text.split(delimiter)
        if (!blockTexts.length) {
            blockTexts.push('')
        }
        const blocks = blockTexts.map(Block.createFromText);
        const blockMap = BlockMapBuilder.createFromArray(blocks)
        return new Content({ blockMap })
    }


}