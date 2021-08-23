import * as types from './constants';
import { urlServer } from '../helpers/utils';

export const createTask = (task) => {
  return {
    type: types.CREATE_TASK,
    payload: task,
  };
};
export const toggleTask = (id) => {
  return {
    type: types.TOGGLE_TASK,
    payload: id,
  };
};
export const deleteTask = (id) => {
  return {
    type: types.DELETE_TASK,
    payload: id,
  };
};
export const completeAllTasks = () => {
  return {
    type: types.COMPLETE_ALL_TASKS,
  };
};
export const clearCompleteTasks = () => {
  return {
    type: types.CLEAR_COMPLETE_TASKS,
  };
};
export const loadTask = (data) => {
  return {
    type: types.LOAD_TASKS,
    payload: data,
  };
};
export const openSignUp = (bool) => {
  return {
    type: types.TOGGLE_COMPONENT,
    payload: bool,
  };
};
export const addUser = (data) => {
  return {
    type: types.SET_USER,
    payload: data,
  };
};
export const logOutUser = () => {
  return {
    type: types.LOGOUT_USER,
  };
};
export const addErrorSignInRequest = (textError) => {
  return {
    type: types.ADD_ERROR_SIGNIN_REQUEST,
    payload: textError,
  };
};
export const addErrorSignUpRequest = (textError) => {
  return {
    type: types.ADD_ERROR_SIGNUP_REQUEST,
    payload: textError,
  };
};
export const addGratzSignUpRequest = () => {
  return {
    type: types.ADD_GRATZ_SIGNUP_REQUEST,
  };
};
export const removeRequestError = () => {
  return {
    type: types.REMOVE_ERROR_REQUEST,
  };
};
export const getTasksThunkCreator = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${urlServer}/tasks/`, {
        method: 'GET',
        mode: 'cors',
      });
      const status = response.status;
      const tasksList = await response.json();
      if (200 <= status && status < 300) dispatch(loadTask(tasksList));
    } catch (e) {
      console.log(e);
    }
  };
};
export const setTaskThunkCreator = (formValue) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${urlServer}/tasks/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ todo: formValue }),
      });
      const status = response.status;
      const task = await response.json();
      if (200 <= status && status < 300) dispatch(createTask(task));
    } catch (e) {
      console.log(e);
    }
  };
};
export const toggleTaskThunkCreator = (task) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${urlServer}/tasks/${task._id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ isCompleted: !task.isCompleted }),
      });
      const status = response.status;
      const result = await response.json();
      if (200 <= status && status < 300) dispatch(toggleTask(result._id));
    } catch (e) {
      console.log(e);
    }
  };
};
export const deleteTaskThunkCreator = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${urlServer}/tasks/${id}`, {
        method: 'DELETE',
        mode: 'cors',
      });
      const status = response.status;
      const result = await response.json();
      if (200 <= status && status < 300) dispatch(deleteTask(result._id));
    } catch (e) {
      console.log(e);
    }
  };
};
export const completeAllTasksThunkCreator = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${urlServer}/tasks/bulk_update`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const status = response.status;
      if (200 <= status && status < 300) dispatch(completeAllTasks());
    } catch (e) {
      console.log(e);
    }
  };
};
export const clearCompletedTasksThunkCreator = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${urlServer}/tasks/bulk_delete`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const status = response.status;
      if (200 <= status && status < 300) dispatch(clearCompleteTasks());
    } catch (e) {
      console.log(e);
    }
  };
};
export const signInUserThunkCreator = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${urlServer}/users/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
      const status = response.status;
      const dataUser = await response.json();
      if (status === 400) {
        dispatch(addErrorSignInRequest(dataUser.error));
        setTimeout(() => {
          dispatch(removeRequestError());
        }, 5000);
        return;
      }
      if (200 <= status && status < 300) {
        dispatch(addUser(dataUser.user));
        localStorage.setItem('token', dataUser.token);
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const singUpUserThunkCreator = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${urlServer}/users/create`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
      const status = response.status;
      const dataResponse = await response.json();
      if (status === 400) {
        dispatch(addErrorSignUpRequest(dataResponse.error));
        return;
      }
      if (200 <= status && status < 300) {
        dispatch(addGratzSignUpRequest());
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const authUserThunkCreator = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${urlServer}/users/auth`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const json = await response.json();
      const statusCode = response.status;
      if (statusCode === 401) return localStorage.removeItem('token');
      dispatch(addUser(json.user));
    } catch (e) {
      console.log(e);
      localStorage.removeItem('token');
    }
  };
};
