import * as types from './constants';
import {
  changeTaskService,
  completeAllTasksService,
  createTaskService,
  deleteCompletedTasksService,
  deleteTaskService,
  getTasksService,
  toggleTaskService,
} from '../../service/task';
import { LOGIN_USER_ERROR, LOGOUT_USER } from '../user/constants';

export const getTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: types.LOAD_TASKS_START,
    });
    const data = await getTasksService();
    return dispatch({
      type: types.LOAD_TASKS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    if (e.status === 401) {
      dispatch({
        type: LOGOUT_USER,
      });
      return dispatch({
        type: LOGIN_USER_ERROR,
        payload: e,
      });
    }
    return dispatch({
      type: types.LOAD_TASKS_ERROR,
      payload: e,
    });
  }
};
export const createTask = (task) => async (dispatch) => {
  try {
    dispatch({
      type: types.CREATE_TASK_START,
    });
    const data = await createTaskService(task);
    return dispatch({
      type: types.CREATE_TASK_SUCCESS,
      payload: data,
    });
  } catch (e) {
    if (e.status === 401) {
      dispatch({
        type: LOGOUT_USER,
      });
      return dispatch({
        type: LOGIN_USER_ERROR,
        payload: e,
      });
    }
    return dispatch({
      type: types.CREATE_TASK_ERROR,
      payload: e,
    });
  }
};
export const toggleTask = (task) => async (dispatch) => {
  try {
    dispatch({
      type: types.TOGGLE_TASK_START,
    });
    const data = await toggleTaskService(task);
    return dispatch({
      type: types.TOGGLE_TASK_SUCCESS,
      payload: data._id,
    });
  } catch (e) {
    if (e.status === 401) {
      dispatch({
        type: LOGOUT_USER,
      });
      return dispatch({
        type: LOGIN_USER_ERROR,
        payload: e,
      });
    }
    return dispatch({
      type: types.TOGGLE_TASK_ERROR,
      payload: e,
    });
  }
};
export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.DELETE_TASK_START,
    });
    const data = await deleteTaskService(id);
    return dispatch({
      type: types.DELETE_TASK_SUCCESS,
      payload: data._id,
    });
  } catch (e) {
    if (e.status === 401) {
      dispatch({
        type: LOGOUT_USER,
      });
      return dispatch({
        type: LOGIN_USER_ERROR,
        payload: e,
      });
    }
    return dispatch({
      type: types.DELETE_TASK_ERROR,
      payload: e,
    });
  }
};
export const completeAllTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: types.COMPLETE_ALL_TASKS_START,
    });
    const data = await completeAllTasksService();
    return dispatch({
      type: types.COMPLETE_ALL_TASKS_SUCCESS,
    });
  } catch (e) {
    if (e.status === 401) {
      dispatch({
        type: LOGOUT_USER,
      });
      return dispatch({
        type: LOGIN_USER_ERROR,
        payload: e,
      });
    }
    return dispatch({
      type: types.COMPLETE_ALL_TASKS_ERROR,
      payload: e,
    });
  }
};
export const deleteCompletedTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: types.DELETE_COMPLETED_TASKS_START,
    });
    const data = await deleteCompletedTasksService();
    return dispatch({
      type: types.DELETE_COMPLETED_TASKS_SUCCESS,
    });
  } catch (e) {
    if (e.status === 401) {
      dispatch({
        type: LOGOUT_USER,
      });
      return dispatch({
        type: LOGIN_USER_ERROR,
        payload: e,
      });
    }
    return dispatch({
      type: types.DELETE_COMPLETED_TASKS_ERROR,
      payload: e,
    });
  }
};
export const changeTask = (id, todo) => async (dispatch) => {
  try {
    dispatch({
      type: types.CHANGE_TASK_START,
    });
    const data = await changeTaskService(id, todo);
    return dispatch({
      type: types.CHANGE_TASK_SUCCESS,
      payload: data,
    });
  } catch (e) {
    if (e.status === 401) {
      dispatch({
        type: LOGOUT_USER,
      });
      return dispatch({
        type: LOGIN_USER_ERROR,
        payload: e,
      });
    }
    console.log(e);
    return dispatch({
      type: types.CHANGE_TASK_ERROR,
      payload: e,
    });
  }
};
