import removeMark2 from '@src/control/removeMark2.js'
const removeLink = (state) => {
    return removeMark2(state, 'a')
}




export default removeLink