import React, { Component, Fragment, createRef, useRef, useState, useEffect } from 'react'

import decorator from '@components/Editor/decorator.js'
import addLink from '@src/control/addLink.js'
import styled from 'styled-components'

const Styled = styled.div `
 line-height: 2;
 padding: 0 20px;
`
class App extends Component {
    onClick = (e) => {
        addLink(this.props.getState())
    }

    render() {

        return <Styled onClick={this.onClick}>
             添加链接
        </Styled>
    }

}


export default App