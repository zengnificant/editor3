import React, { Component } from 'react';

import Editor from './EditorApp.jsx'

import createStore from '@redux/store/index.js'
import { Provider } from 'react-redux'


export default class App extends Component {
    render() {
        const store = createStore()
        return (
            <Provider store={store}>
        <Editor />
      </Provider>
        )
    }
}