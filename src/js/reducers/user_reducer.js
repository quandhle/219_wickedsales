import SignIn from '../constants/action-types';
import SignOut from '../constants/action-types';
import axios from 'axios';

const DEFAULT_STATE = {
    signed_in: false,
    cart_id: null,
    is_guest: true,
    last_name: null,
    first_name: null
};

const userReducer = function (state = DEFAULT_STATE, action) {    
    switch (action.type) {
        case "SignIn":
            return {
                signed_in: true,
                is_guest: false,
                cart_id: null,
                last_name: null,
                first_name: null
            };
        case "SignOut":
            return {...DEFAULT_STATE};
        default:
            return state;
    }
}

export default userReducer;
