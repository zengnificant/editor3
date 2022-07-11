import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Editor from '@components/Editor/Editor.jsx'
import { List, OrderedMap, OrderedSet, Stack, is, fromJS, Iterable } from 'immutable'
const { isIterable } = Iterable
const a = List().concat([1, 'wo'])
//console.log(a)
function App() {
    const [count, setCount] = useState(0)
    return (
        <div className="App" >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <Editor/>
        <p>Hello Vite + React! </p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
    )
}

export default App