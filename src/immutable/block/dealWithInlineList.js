import { List, is, Map } from 'immutable'
import { Meta } from '@src/immutable/index.js'


function changeA(a) {
    return a.reduce((ac, el, i) => {
            if (i == 0) {
                return ac.push(Map({ decorator: el }))
            }
            return List([Map({ decorator: el, children: ac })])
        },
        List())
}


function changeB(a, b) {
    let before = a.pop()
    let retA = a.last();
    const firstA = retA.get('decorator');
    const firstAChildren = retA.get('children');
    let retB = b.first()
    const firstB = retB.get('decorator');
    const firstBChildren = retB.get('children');
    let after = b.shift()

    if (is(firstA, firstB)) {
        if (!firstAChildren || !firstBChildren) {
            //let temp = retA.concat(retB)
            return a.concat(b)
        }

        let tempChildren = changeB(firstAChildren, firstBChildren)

        retA = retA.set('children', tempChildren)
        return before.push(retA).concat(after)
    }
    return a.concat(b)
}



const dealInlines = (inlines) => {
    return inlines.map((inline, index) => {
        const firstEl = inline.first()
        const text = inline.map(e => e.getText()).join('')
        const decoratorTree = firstEl.getDecoratorTree().unshift(Map({ text, index }))
        return changeA(decoratorTree)
    }).reduce((a, b, i) => changeB(a, b))


}

export default dealInlines