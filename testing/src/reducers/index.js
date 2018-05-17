import { combineReducers } from 'redux';
import commentsReducer from './comments';

const rootReducer = combineReducers({
  //commenti: (state = []) => state
  commenti: commentsReducer

});

export default rootReducer;
