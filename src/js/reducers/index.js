import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducer from './user_reducer';

const initialState = {
    user: []
};

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer
});

export default rootReducer;