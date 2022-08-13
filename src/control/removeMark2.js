import control from './control.js'

const removeTagForMeta = (meta, tag) => {
    const decoratorTree = meta.getDecoratorTree()
    const decoratorTree2 = decoratorTree.filter(decorator => {

        return decorator.getTag() !== tag

    });

    if (decoratorTree.size === decoratorTree2.size) return meta;
    return meta.set('decoratorTree', decoratorTree2)
}


let fn = control(removeTagForMeta);


export default control(removeTagForMeta)