import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import Counter from './Counter.jsx';
import updateAddress from './actions/updateAddress.jsx';
import address from './reducers/address.jsx';

const store = createStore(address);

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
)(Counter);

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
