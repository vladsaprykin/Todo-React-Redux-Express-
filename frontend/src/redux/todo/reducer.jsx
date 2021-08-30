import * as types from './constants';

const initialState = {
  tasks: [],
  isLoading: false,
};
export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.concat([action.payload]),
      };
    case types.TOGGLE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          if (action.payload === item._id) item.isCompleted = !item.isCompleted;
          return item;
        }),
      };
    case types.CHANGE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          if (action.payload._id === item._id) item.todo = action.payload.todo;
          return item;
        }),
      };
    case types.DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((item) => item._id !== action.payload),
      };
    case types.COMPLETE_ALL_TASKS_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          if (!item.isCompleted) item.isCompleted = true;
          return item;
        }),
      };
    case types.DELETE_COMPLETED_TASKS_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((item) => !item.isCompleted),
      };
    case types.LOAD_TASKS_START:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOAD_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
