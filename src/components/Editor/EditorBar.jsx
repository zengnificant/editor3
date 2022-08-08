import React, { Component, Fragment, createRef, useRef, useState, useEffect } from 'react'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BLOCK_KEY_NAME } from '@constants/arg.js'
import { forceUpdate2 } from '@redux/actions/index.js'
import { is } from 'immutable'

class App extends Component {

    render() {

        return <div>

        </div>
    }

}

const decorator = connect(mapStateToProps)

export default decorator(App)