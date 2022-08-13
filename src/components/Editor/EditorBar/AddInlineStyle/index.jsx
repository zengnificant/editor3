import React, { Component, Fragment, createRef, useRef, useState, useEffect } from 'react'

import decorator from '@components/Editor/decorator.js'
import addInlineStyle from '@src/control/addInlineStyle.js'
import styled from 'styled-components'

const Styled = styled.div `
 line-height: 2;
 padding: 0 20px;
`
class App extends Component {
    onClick = (e) => {
        addInlineStyle(this.props.getState(), { fontStyle: 'italic' })
    }

    render() {

        return <Styled onClick={this.onClick}>
             i(变斜体)
        </Styled>
    }

}


export default App