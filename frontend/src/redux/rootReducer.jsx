import { combineReducers } from 'redux';
import { tasksReducer } from './tasksReducer';
import { signUpReducer } from './signUpReducer';
import { userReducer } from './userReducer';
import { requestSignReducer } from './requestSignReducer';

export const rootReducer = combineReducers({
  todo: tasksReducer,
  signUp: signUpReducer,
  user: userReducer,
  requestError: requestSignReducer,
});
