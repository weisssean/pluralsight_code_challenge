import {combineReducers} from 'redux';
import questions from './questionsReducer';
import user from './selectedUserReducer';
import account from './accountReducer';
import routes from './routeReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  account,
  users,
  user,
  routes
});

export default rootReducer;
