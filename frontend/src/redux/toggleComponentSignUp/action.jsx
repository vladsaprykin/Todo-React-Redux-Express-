import * as types from './constants';

export const openSignUp = (bool) => {
  return {
    type: types.TOGGLE_COMPONENT,
    payload: bool,
  };
};
