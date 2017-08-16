import { ADDRESS } from '../constants'

const addressReducer = ( state = { address: " " }, action ) => {
    switch (action.type) {
        case ADDRESS:
            return Object.assign({}, state, {
                address: action.address
            });
        default:

    }
}

export default addressReducer;