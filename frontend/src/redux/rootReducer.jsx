import { combineReducers } from 'redux';
import { tasksReducer } from './tasksReducer';
import { signUpReducer } from './signUpReducer';
import { userReducer } from './userReducer';


export const rootReducer = combineReducers({
	todo: tasksReducer,
	signUp: signUpReducer,
	user: userReducer,
})