import { List } from 'immutable'
const Range = (a, b) => {
    return List(Array(b - a).fill(a).map((v, index) => v + index))
}

const filterIndex = (list, fn) => {

    return list.filter(fn).map(v => list.findIndex(el => el === v))
}


const splitList = (list, fn) => {
    const indexArr = filterIndex(list, fn)
    if (indexArr.size === 0) {
        return list
    }


    let ret = []
    indexArr.push(list.size).reduce((ac, el, index) => {

        let start = index === 0 ? 0 : ac + 1
        let curEl = Range(start, el).map(index => list.get(index))
        if (curEl.size) ret.push(curEl)
        ret.push(list.get(el));
        return el;
    }, 0)

    return List(ret).slice(0, -1)
}

export default splitList