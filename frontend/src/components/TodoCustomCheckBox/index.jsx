import React from "react";
import { deleteTask, toggleTask } from "../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "./.module.css"

const TodoCustomCheckBox = ({ task }) => {
	const dispatch = useDispatch();
	const handleToggleTask = async () => {
		const response = await fetch(`http://localhost:3001/tasks/${task._id}`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({isCompleted: !task.isCompleted}),
		})
		const status = await response.status;
		if ( 200 <= status && status < 300) dispatch(toggleTask(task._id))
		// dispatch(toggleTask(task))
	}
	// console.log(task)
	return (
		<>
			<input
			className={styles['custom-check-box']}
			checked={task.isCompleted}
			type="checkbox"
			onChange={() => handleToggleTask()}
			id={task._id}
			/>
			<label className={styles['custom-label']} htmlFor={task._id} />
		</>
	)
}
export default TodoCustomCheckBox;