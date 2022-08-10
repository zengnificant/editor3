import addMark from '@src/control/addMark.js'
import { pipe } from '@nifi/helpers/pipe.js'
const addLink = (state, opts = { href: '#' }) => {
    return addMark(state, 'a', opts)
}




export default addLink