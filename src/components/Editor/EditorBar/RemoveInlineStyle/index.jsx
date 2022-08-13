import React, { Component, Fragment, createRef, useRef, useState, useEffect } from 'react'

import decorator from '@components/Editor/decorator.js'
import removeInlineStyle from '@src/control/removeInlineStyle.js'
import styled from 'styled-components'

const Styled = styled.div `
 line-height: 2;
 padding: 0 20px;
`
class App extends Component {
    onClick = (e) => {
        removeInlineStyle(this.props.getState(), { fontStyle: 'italic' })
    }

    render() {

        return <Styled onClick={this.onClick}>
             变直体
        </Styled>
    }

}


export default App