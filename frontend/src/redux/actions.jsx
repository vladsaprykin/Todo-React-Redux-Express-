import * as types from "./constants";

export const createTask = (task) => {
	return {
		type: types.CREATE_TASK,
		payload: task
	}
}
export const toggleTask = (id) => {
	return {
		type: types.TOGGLE_TASK,
		payload: id
	}
}
export const deleteTask = (id) => {
	return {
		type: types.DELETE_TASK,
		payload: id
	}
}
export const completeAllTasks = () => {
	return {
		type: types.COMPLETE_ALL_TASKS,
	}
}
export const clearCompleteTasks = () => {
	return {
		type: types.CLEAR_COMPLETE_TASKS,
	}
}
export const loadTask = (data) => {
	return {
		type: types.LOAD_TASKS,
		payload: data
	}
}