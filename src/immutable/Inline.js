import { Map, OrderedSet, OrderedMap, fromJS } from 'immutable'
import { StupidRecord } from '@nifi/helpers/StupidRecord.js'
import { isString, isObject } from '@nifi/utils/isTypeUtils.js'
import DimenTag from '@src/immutable/DimenTag.js'
const defaultRecord = {
    inlineStyle: OrderedMap(),
    className: OrderedSet(),
    data: Map(),
    tag: 'span'
};
export default class Inline extends StupidRecord(defaultRecord) {


}