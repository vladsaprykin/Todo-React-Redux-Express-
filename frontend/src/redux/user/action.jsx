import * as types from './constants';
import { createUserService, deleteUserService, getUserService, loginUserService } from '../../service/user';

export const logOutUser = () => {
  return {
    type: types.LOGOUT_USER,
  };
};
export const removeErrorRequest = () => {
  return {
    type: types.REMOVE_ERROR_REQUEST,
  };
};
export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_USER_START,
    });
    const data = await getUserService();
    return dispatch({
      type: types.GET_USER_SUCCESS,
      payload: data,
    });
  } catch (e) {
    return dispatch({
      type: types.GET_USER_ERROR,
      payload: e,
    });
  }
};
export const loginUser = (dataUser) => async (dispatch) => {
  try {
    dispatch({
      type: types.LOGIN_USER_START,
    });
    const data = await loginUserService(dataUser);
    return dispatch({
      type: types.LOGIN_USER_SUCCESS,
      payload: data,
    });
  } catch (e) {
    return dispatch({
      type: types.LOGIN_USER_ERROR,
      payload: e,
    });
  }
};
export const createUser = (dataUser) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.CREATE_USER_START,
      });
      const data = await createUserService(dataUser);
      return dispatch({
        type: types.CREATE_USER_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.CREATE_USER_ERROR,
        payload: e,
      });
    }
  };
};
export const deleteUser = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.DELETE_USER_START,
      });
      await deleteUserService();
      dispatch({
        type: types.LOGOUT_USER,
      });
      return dispatch({
        type: types.DELETE_USER_SUCCESS,
      });
    } catch (e) {
      return dispatch({
        type: types.DELETE_USER_ERROR,
        payload: e,
      });
    }
  };
};
