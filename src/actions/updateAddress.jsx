import { ADDRESS } from '../constants';

const updateAddress = (address) => {
    return {
        type: ADDRESS,
        address
    }
};

export default updateAddress;