import { Record } from 'immutable'

export function StupidRecord(defaultRecord) {
    const Unnamed = Record(defaultRecord);
    const keys = Object.keys(defaultRecord)
    keys.forEach((key, index) => {
        if (typeof key != 'string') return;
        const len = key.length
        const newKey = key[0].toUpperCase() + key.substr(1);
        Unnamed.prototype['get' + newKey] = function() {
            return this.get(key)
        }
    })
    return Unnamed
}