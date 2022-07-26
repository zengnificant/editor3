import { StupidRecord } from '@nifi/helpers/StupidRecord.js'
const defaultRecord = {
    a: 0,
    b: 0,
    aKey: '',
    bKey: '',
    isBackward: false
};


export default class Selection extends StupidRecord(defaultRecord) {


    getK(num) {
        switch (num) {
            case 0:
                return this.get('aKey')

            default:
                return this.get('bKey')
        }
    }
    get isBackward() {
        return this.get('isBackward')
    }



    get start() {
        return this.isBackward ?
            this.getB() :
            this.getA();
    }

    get end() {
        return !this.isBackward ?
            this.getB() :
            this.getA();
    }
    get startKey() {
        return this.isBackward ? this.getK(1) : this.getK(0);
    }

    get endKey() {
        return !this.isBackward ? this.getK(1) : this.getK(0);
    }

    get isCollapsed() {
        return (
            this.start === this.end &&
            this.startKey === this.endKey
        );
    }
    static isSelection(sel) {
        return sel instanceof Selection
    }

    static create(opts) {
        return new Selection(opts)
    }
    static set(selection, opts) {

        return selection.merge(opts)

    }
    static createByKey(key) {
        return Selection.create({
            aKey: key,
            a: 0,
            bKey: key,
            b: 0,
        });
    }

    static createAtEndOfContent(content) {
        const block = content.getLastBlock()
        const key = block.getKey();
        const size = block.size2;
        return Selection.createByKey(key).merge({ a: size, b: size })
    }


}