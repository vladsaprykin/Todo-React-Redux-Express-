import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../redux/actions";
import styles from "./.module.css"

const TodoForm = () => {
	const dispatch = useDispatch();
	const [valueInput, setValueInput] = useState("");
	const handleChange = (event) => {
		setValueInput(event.target.value);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch("http://localhost:3001/tasks/", {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify({todo: valueInput}),
			},
		);
		const status = await response.status;
		const task = await response.json();
		if ( 200 <= status && status < 300)	dispatch(createTask(task))
		setValueInput("");
	};
	return (
		<form className={styles["todo__form"]} onSubmit={handleSubmit}>
			<input
				type="text"
				className={styles["form__input"]}
				name="todo"
				value={valueInput}
				onChange={handleChange}
				placeholder="Enter your task name here"
				required
				minLength="3"
			/>
		</form>
	);
}
export default TodoForm;