import { combineReducers } from 'redux';
import { ADDRESS } from '../constants'

const address = ( state = { address: " " }, action ) => {
    switch (action.type) {
        case ADDRESS:
            return Object.assign({}, state, {
                address: action.address
            });
        default:
            return state;
    }
};

const reducers = combineReducers({
    address
});

export default reducers;