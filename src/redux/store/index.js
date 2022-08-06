import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import promiseMiddleware from 'redux-promise';
import rootReducer from '@redux/reducer.js'

const getStore = (initialState) => {
    let store;
    if (initialState) { store = createStore(rootReducer, initialState, applyMiddleware(thunk, promiseMiddleware)) } else { store = createStore(rootReducer, applyMiddleware(thunk, promiseMiddleware)) }
    return store
};

export default getStore

// const getStore = (initialState) => {
//     let store;
//     if (initialState) { store = createStore(rootReducer, initialState, applyMiddleware(promiseMiddleware)) } else { store = createStore(rootReducer, applyMiddleware(promiseMiddleware)) }
//     return store
// };

// export default getStore