import { Map, OrderedSet, OrderedMap, fromJS } from 'immutable'
import { StupidRecord } from '@nifi/helpers/StupidRecord.js'
import { isString, isObject } from '@nifi/utils/isTypeUtils.js'
import DimenTag from '@src/immutable/DimenTag.js'
const defaultRecord = {
    text: '',
    inlineStyles: OrderedMap(),
    className: OrderedSet(),
    data: Map(),
    tag: 'span'
};
export default class Meta extends StupidRecord(defaultRecord) {

    get size() {
        if (Meta.isDimen(this)) {
            return 1;
        }
        return this.getText().length
    }
    static isDimen(any) {
        return Meta.isMeta(any) && DimenTag.has(any.get('tag'))
    }
    static isMeta(any) {
        return any instanceof Meta
    }

    isEmpty() {
        return (!Meta.isDimen(this)) && this.getText() === ''

    }
    static create(meta) {
        if (Meta.isMeta(meta)) {
            return meta
        }
        if (isString(meta)) {
            return new Meta({ text: meta })
        }
        if (isObject(meta)) {
            let inlineStyles = meta['inlineStyles'],
                className = meta['className'],
                data = meta['data']
            meta['inlineStyles'] = OrderedMap(inlineStyles)
            meta['className'] = Array.isArray(className) ? OrderedSet(className) : OrderedSet()
            meta['data'] = Map(data)

        }
        return new Meta(meta)
    }

}