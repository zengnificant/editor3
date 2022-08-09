import React, { Component, Fragment, createRef, useRef, useState, useEffect } from 'react'

import decorator from '@components/Editor/decorator.js'
import toggleBlock from '@src/control/toggleBlock.js'
import styled from 'styled-components'

const Styled = styled.div `
 line-height: 2;
 padding: 0 20px;
`
class App extends Component {
    onClick = (e) => {
        toggleBlock(this.props.getState(), 'h1')
    }

    render() {

        return <Styled onClick={this.onClick}>
             h1
        </Styled>
    }

}


export default App