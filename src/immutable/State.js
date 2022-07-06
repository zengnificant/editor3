import { List, OrderedMap, OrderedSet, Stack, is, fromJS, Iterable } from 'immutable'

import { StupidRecord } from '@nifi/helpers/StupidRecord.js'
import Content from '@src/immutable/Content.js'
import Selection from '@src/immutable/Selection.js'
import Block from '@src/immutable/Block.js'
import throwError from '@nifi/utils/throwError.js'

const { isIterable } = Iterable

const defaultRecord = {
    content: null,
    selection: null
};

export default class State extends StupidRecord(defaultRecord) {

    static createWithContent(content) {
        const key = content.getFirstBlock().getKey()
        const selection = Selection.createByKey(key)
        return new State({ content, selection })

    }
    static createEmpty() {
        return State.createFromText()
    }
    static createFromText(text) {
        return State.createWithContent(
            Content.createFromText(text || ''),
        );
    }
    static create(config, opts) {
        if (isIterable(config)) {
            return new State(config)
        }
        const fromJSConfig = fromJS(config)
        let content = fromJSConfig.get('content')
        let selection = fromJSConfig.get('selection')
        content = Content.isContent(content) ? content : Content.create(content)
        if (!Content.isContent(content)) {
            throwError(`${config}参数错误`)
        }
        const fisrtKey = content.getLastBlock().getKey()
        selection = Selection.createEmpty(fisrtKey)
        return new State({ content, selection })
    }

    //TODO:selection 基本要变化了
    static set(state, config, opts) {

        const content = state.getContent()
        return state.merge(config)

    }

    getText() {
        return this.getContent().getText()
    }
    hasText() {
        return this.getContent().getText().length > 0
    }



}