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
}

export default address;