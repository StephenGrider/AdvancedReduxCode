import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';// imp the reducer from redux-form and create an alias [... as form] to use a clearer name
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  form,// include the reducer from redux-form [form: form ES6 abbreviation]
  auth: authReducer
});

export default rootReducer;
