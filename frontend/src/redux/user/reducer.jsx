import * as types from './constants';
import { deleteCookie, setCookie } from '../../helpers/utils';

const initialState = {
  username: '',
  email: '',
  authenticated: false,
  isLoading: true,
  message: {
    isOpenModal: false,
    type: '',
    content: '',
  },
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_START:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_USER_SUCCESS:
      setCookie('token', action.payload.token);
      return {
        ...state,
        username: action.payload.user.username,
        email: action.payload.user.email,
        authenticated: true,
        isLoading: false,
      };
    case types.GET_USER_ERROR:
      deleteCookie('token');
      return {
        ...state,
        isLoading: false,
      };
    case types.LOGIN_USER_SUCCESS:
      setCookie('token', action.payload.token);
      return {
        ...state,
        username: action.payload.user.username,
        email: action.payload.user.email,
        authenticated: true,
        isLoading: false,
      };
    case types.LOGIN_USER_ERROR:
      return {
        ...state,
        message: {
          isOpenModal: true,
          type: 'Error',
          content: action.payload.error,
        },
      };
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        message: {
          isOpenModal: true,
          type: 'Congratulations',
          content: 'Create account',
        },
      };
    case types.CREATE_USER_ERROR:
      return {
        ...state,
        message: {
          isOpenModal: true,
          type: 'Error',
          content: action.payload.error,
        },
      };
    case types.REMOVE_ERROR_REQUEST:
      return {
        ...state,
        message: {
          isOpenModal: false,
          type: '',
          content: '',
        },
      };
    case types.LOGOUT_USER:
      deleteCookie('token');
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
};
