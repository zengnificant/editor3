import { List, OrderedMap, OrderedSet, Stack, is, fromJS, Iterable } from 'immutable'

import { StupidRecord } from '@nifi/helpers/StupidRecord.js'
import Content from '@src/immutable/Content.js'
import Selection from '@src/immutable/Selection.js'
import Block from '@src/immutable/Block.js'
import throwError from '@nifi/utils/throwError.js'




const content = Content.createFromText('')
const selection = new Selection()
const { isIterable } = Iterable

const defaultRecord = {
    content,
    selection
};

export default class EditorState extends StupidRecord(defaultRecord) {
    static create(any) {

        return new EditorState(any)

    }
}