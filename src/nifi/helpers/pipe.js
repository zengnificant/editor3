import { isFunction, getType } from '@nifi/utils/isTypeUtils.js'

export function pipe() {
    const state = this;

    const args = [...arguments]
    const [fn, selector = state => {
        if (state) {
            return state.payload
        }
    }] = args;
    let ret;
    if (isFunction(fn)) {
        ret = state ? fn(state) : fn()
    } else {
        ret = fn;
    }
    ret = selector(ret)

    return { ...ret, pipe: pipe.bind(ret) }

}