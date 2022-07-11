import { Map, OrderedSet, OrderedMap, fromJS } from 'immutable'
import { StupidRecord } from '@nifi/helpers/StupidRecord.js'
import { isString, isObject } from '@nifi/utils/isTypeUtils.js'
const defaultRecord = {
    inlineStyles: OrderedMap(),
    className: OrderedSet(),
    tag: 'span',
    href: undefined,
    src: undefined,
    alt: undefined,
    baseType: 0
};
export default class Decorator extends StupidRecord(defaultRecord) {
    static isDecorator(any) {
        const check1 = any instanceof Decorator
        if (!check1) return false;
        const inlineStyles = any.getInlineStyles()
        const className = any.getClassName()
        const check2 = OrderedMap.isOrderedMap(inlineStyles) && OrderedSet.isOrderedSet(className)
        return check2;
    }

    static createEmpty() {
        return new Decorator;
    }

    static create(any) {

        let ret = new Decorator(any)
        const inlineStyles = ret.getInlineStyles()
        if (!OrderedMap.isOrderedMap(inlineStyles)) {
            ret = ret.set('inlineStyles', OrderedMap(inlineStyles))
        }
        const className = ret.getClassName()
        if (!OrderedSet.isOrderedSet(className)) {
            ret = ret.set('className', OrderedSet(className))
        }

        return ret
    }


    get size2() {
        if (!!this.get('baseType')) {
            return 1
        }
        return 0;
    }




}