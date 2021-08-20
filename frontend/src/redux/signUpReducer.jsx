import * as types from './constants';

const initialState = {
  signUpOpen: false,
};
export const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_COMPONENT:
      return {
        ...state,
        signUpOpen: action.payload,
      };
    default:
      return state;
  }
};
