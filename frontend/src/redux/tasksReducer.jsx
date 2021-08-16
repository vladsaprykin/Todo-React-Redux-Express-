import * as types from "./constants";

const initialState = {
	tasks: [],
}
export const tasksReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.CREATE_TASK:
			return {
				...state,
				tasks: state.tasks.concat([action.payload]),
			}
		case types.TOGGLE_TASK:
			return {
				...state,
				tasks: state.tasks.map((item) => {
					if (action.payload === item._id) item.isCompleted = !item.isCompleted
					return item
				})
			}
		case types.DELETE_TASK:
			return {
				...state,
				tasks: state.tasks.filter((item) => (item._id !== action.payload))
			}
		case types.COMPLETE_ALL_TASKS:
			return {
				...state,
				tasks: state.tasks.map(item => {
					if (!item.isCompleted) item.isCompleted = true
					return item
				})
			}
		case types.CLEAR_COMPLETE_TASKS:
			return {
				...state,
				tasks: state.tasks.filter(item => (!item.isCompleted))
			}
		case types.LOAD_TASKS:
			return {
				...state,
				tasks: action.payload
			}
		default:
			return state
	}
	return state
}