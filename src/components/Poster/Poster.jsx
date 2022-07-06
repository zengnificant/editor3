import React, { Component, Fragment, createRef } from 'react'
import ReactDOM from 'react-dom'

import PosterStyled from './PosterStyled.jsx'
import PosterContent from './PosterContent.jsx'
class App extends Component {

    constructor(props) {
        super(props);

    }


    render() {

        const { content } = this.props

        return <PosterStyled className='PosterContainer' >
          <div   className='PosterContent'>
          <PosterContent content={content}/>
          </div>
        </PosterStyled>


    }


}

export default App