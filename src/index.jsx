import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import Form from './Form.jsx';
import updateAddress from './actions/updateAddress.jsx';
import reducers from './reducers/reducers.js';

const store = createStore(reducers);

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        address: state.address
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onUpdateAddress: () => dispatch(updateAddress(this.state.address))
    }
}

// Connected Component
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Form);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-root')
);

/*

import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';
import { Provider, connect } from 'react-redux';
import store from './store.jsx';

function mapDispatchToProps(dispatch){
    return {
        action: () => dispatch()
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('react-root'));
*/
