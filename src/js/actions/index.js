import {SignIn} from '../constants/action-types';
import {SignOut} from '../constants/action-types';

export function signIn (user) {
    console.log('user is: ', user);

    localStorage.setItem('login', true);
    localStorage.setItem('last_name', user.last_name);
    localStorage.setItem('first', user.first_name);
    localStorage.setItem('token', user.token);
    localStorage.setItem('user_id', user.user_id);
    localStorage.setItem('cart_id', user.cart_id);
    localStorage.setItem('signed_in', true);
    localStorage.setItem('is_guest', false);

    return {
        type: SignIn.type,
    }
}

export function signOut (user) {
    localStorage.removeItem('login');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('cart_id');
    localStoage.setItem('signed_in', false);
    localStorage.setItem('is_guest', true);

    return {
        type: SignOut.type
    };
}
