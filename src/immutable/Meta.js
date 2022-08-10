import { Map, OrderedSet, OrderedMap, fromJS, List, is } from 'immutable'
import { StupidRecord } from '@nifi/helpers/StupidRecord.js'
import { isString, isObject } from '@nifi/utils/isTypeUtils.js'
import Decorator from './Decorator.js'
import throwError from '@nifi/utils/throwError.js'
const defaultDecoratorTree = List().push(new Decorator)
const defaultRecord = {
    text: '',
    decoratorTree: defaultDecoratorTree
};
export default class Meta extends StupidRecord(defaultRecord) {

    get size2() {
        const a = this.getText().length;
        const b = this.decorator.size2
        return a + b
    }
    get decorator() {
        return this.getDecoratorTree().first()
    }



    static isMeta(any) {
        return any instanceof Meta
    }
    static create(any) {
        let meta = new Meta(any)
        let decoratorTree = meta.getDecoratorTree()
        if (!decoratorTree.size) {
            meta = meta.set('decoratorTree', defaultDecoratorTree)
        }

        return meta;

    }

    static createFromText(text) {
        if (!isString(text)) {
            throwError(`${text}不是字符串`)
        }
        const arr = text.match(/./usg)
        if (arr && arr.length !== 1) {
            throwError(`${text}不能是空字符串或者多个字符。`)
        }

        return Meta.create({ text })
    }

}