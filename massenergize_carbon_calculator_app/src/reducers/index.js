
import { reducer as formReducer } from 'redux-form';
import { answeredReducer } from './answeredReducer';
import eventsReducer from './eventsReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';


export default combineReducers({
    answered: answeredReducer,
    event: eventsReducer,
    auth: authReducer,
    firebase: firebaseReducer,
    form: formReducer,
})