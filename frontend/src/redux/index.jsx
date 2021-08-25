import { combineReducers } from 'redux';
import { tasksReducer } from './todo/reducer';
import { signUpReducer } from './toggleComponentSignUp/reducer';
import { userReducer } from './user/reducer';

export const rootReducer = combineReducers({
  todo: tasksReducer,
  signUp: signUpReducer,
  user: userReducer,
});
