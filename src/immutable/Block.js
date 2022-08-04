import { Map, List, OrderedMap, OrderedSet, Iterable, is } from 'immutable'

import { StupidRecord } from '@nifi/helpers/StupidRecord.js'

import createKey from '@nifi/helpers/createKey.js'
import Meta from './Meta.js'
import { isString, isObject } from '@nifi/utils/isTypeUtils.js'
const defaultRecord = {
    key: undefined,
    list: List(),
    tag: 'div',
    depth: 0,
    children: null,
    componentKey: 0

};

const createBlockKey = () => {
    return 'block-' + createKey()
}


export default class Block extends StupidRecord(defaultRecord) {

    static createFromEmpty() {

        return Block.createFromText('')
    }

    static isBlock(data) {
        return data instanceof Block
    }

    static create(data, shouldReserveKey = false) {
        if (!data) return Block.createFromText()
        let block = new Block(data)
        block = block.set('componentKey', 0)
        if (!block.getKey()) {
            return block.set('key', createBlockKey())
        }
        if (shouldReserveKey) {
            return block
        }
        return block.set('key', createBlockKey())

    }

    createEmptyBlock() {
        return this.set('list', List())



    }

    static createFromList(data) {
        return Block.createFromArray(data)
    }
    static createFromArray(data) {

        const key = createBlockKey()
        let list1 = List.isList(data) ? data : List(data)
        let list = list1.size ? list1.map(el => Meta.create(el)) : list1.push(Meta.create())

        return Block.create({ key, list })

    }

    static createFromText(text) {
        if (text == null || text == '') return Block.create({ list: List() })

        const textArr = text.match(/./usg)
        const list = List().concat(textArr.map(Meta.createFromText))

        return Block.create({ list })
    }
    getMetaByIndex(index) {
        return this.getList().get(index)
    }
    resetKey() {
        return this.set('key', createBlockKey())
    }
    isEmpty() {
        if (this.getList().size === 0) {
            return true
        }
    }

    get size2() {

        if (this.getList().size === 0) {
            return 0;
        }
        return this.getList().map(el => el.size2).reduce((a, b) => a + b)
    }





    getText() {
        if (!this.getList().size) {
            return ""
        }
        return this.getList().map(el => el.getText()).join('')
    }


}