import removeMark from '@src/control/removeMark.js'
import Decorator from '@src/immutable/Decorator.js'
import control from './control.js'
import pipe from '@nifi/helpers/pipe.js'


const addMarkForMeta = (meta, mark, opts) => {
    const decorator = Decorator.create({ tag: mark, ...opts })
    const decoratorTree = meta.getDecoratorTree()
    const findOne = decoratorTree.find(d => d.getTag() === decorator.getTag())
    if (findOne) {
        let index = decoratorTree.findIndex(decorator => decorator === findOne);
        let newOne = findOne.merge(decorator)
        return meta.set('decoratorTree', decoratorTree.set(index, newOne))
    }
    return meta.set('decoratorTree', decoratorTree.push(decorator))
}

const addPureMark = control(addMarkForMeta)

const addMark = (state, mark, opts = {}) => {
    return pipe(removeMark(state, mark))
        .pipe(state2 => addPureMark(state2, mark, opts))
}


export default addMark