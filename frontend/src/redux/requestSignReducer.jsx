import * as types from './constants';

const initialState = {
  signIn: {
    error: false,
    content: '',
  },
  signUp: {
    isOpenModal: false,
    title: '',
    content: '',
  },
};
export const requestSignReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ERROR_SIGNIN_REQUEST:
      return {
        ...state,
        signIn: {
          error: true,
          content: action.payload,
        },
      };
    case types.ADD_ERROR_SIGNUP_REQUEST:
      return {
        ...state,
        signUp: {
          isOpenModal: true,
          title: 'Error',
          content: action.payload,
        },
      };
    case types.ADD_GRATZ_SIGNUP_REQUEST:
      return {
        ...state,
        signUp: {
          isOpenModal: true,
          title: 'Congratulations',
          content: 'Account created',
        },
      };
    case types.REMOVE_ERROR_REQUEST:
      return {
        ...initialState,
      };
    default:
      return state;
  }
  return state;
};
