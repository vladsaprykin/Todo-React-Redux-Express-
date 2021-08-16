import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { completeAllTasks, clearCompleteTasks, createTask } from "../../redux/actions";
import styles from "./.module.css"

const classNames = require("classnames");

const TodoBar = ({filter, onChangeFilter}) => {
	const btnCenterFilter = [{text: "All", count: 0}, {text: "ToDo", count: 1}, {text: "Completed", count: 2}];
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.todo.tasks);
	const countNotCompletedTasks = useMemo(() => {
		return tasks.filter(item => !item.isCompleted).length;
	}, [tasks]);
	const handleCompleteAllTasks = async () => {
		const response = await fetch("http://localhost:3001/tasks/bulk_update", {
				method: 'PATCH',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
			},
		);
		const status = await response.status;
		if ( 200 <= status && status < 300)	dispatch(completeAllTasks())
	}
	const handleClearCompleteTasks = async () => {
		const response = await fetch("http://localhost:3001/tasks/bulk_delete", {
				method: 'DELETE',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
			},
		);
		const status = await response.status;
		if ( 200 <= status && status < 300)	dispatch(clearCompleteTasks())
	}
	return (
		<div className={styles["todo__bar"]}>
			<div className={styles["todo__bar__btn-left"]}
					 onClick={() => handleCompleteAllTasks()}>{countNotCompletedTasks} tasks left
			</div>
			<div className={styles["todo__bar__btn-center"]}>
				{
					btnCenterFilter.map(item => {
						return <div
							className={
								classNames(styles["todo__bar__btn-center_filter"], {[styles["active-btn"]]: filter === item.count})}
							onClick={() => onChangeFilter(item.count)
							}
						>{item.text}</div>
					})
				}
			</div>
			<div className={styles["todo__bar__btn-right"]}>{
				(countNotCompletedTasks !== tasks.length) && <div
					className={styles["todo__bar__btn_clear-completed"]}
					onClick={
						() => handleClearCompleteTasks()
					}
				>Clear completed</div>
			}
			</div>
		</div>
	)
}
export default TodoBar;