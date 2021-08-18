import * as types from './constants';

const initialState = {
	username: '',
	email: '',
	authenticated: false
}
export const userReducer = (state = initialState, action) => {
	switch (action.type){
		case types.USER_AUTHENTICATION: return {
			...state,
			authenticated: action.payload
		}
		case types.ADD_INFO_OF_USER: return {
			...state,
			username: action.payload.username,
			email: action.payload.login
		}
		default:
			return state
	}
	return state
}