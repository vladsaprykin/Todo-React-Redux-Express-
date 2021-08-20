import * as types from './constants';

const initialState = {
  username: '',
  email: '',
  authenticated: false,
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        authenticated: true,
      };
    case types.LOGOUT_USER:
      localStorage.removeItem('token');
      return initialState;
    default:
      return state;
  }
};
