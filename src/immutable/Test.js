import { StupidRecord } from '@nifi/helpers/StupidRecord.js'
import { isString, isObject } from '@nifi/utils/isTypeUtils.js'
const defaultRecord = {
    text: '',
};
export default class Test extends StupidRecord(defaultRecord) {
    static create(any) {
        return new Test(any)
    }


}