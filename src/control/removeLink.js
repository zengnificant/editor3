import removeMark from '@src/control/removeMark.js'
const removeLink = (state) => {
    return removeMark(state, 'a')
}




export default removeLink