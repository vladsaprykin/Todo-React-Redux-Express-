import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoForm from '../../components/TodoForm';
import TodoBar from '../../components/TodoBar';
import TodoItem from '../../components/TodoItem';
import styles from './.module.css'
import { loadTask } from '../../redux/actions';

const Todo = () => {
	const tasks = useSelector((state) => state.todo.tasks);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(async () => {
		const response = await fetch('http://localhost:3001/tasks/',{
			method: 'GET',
			mode: 'cors',
		})
		const status = await response.status;
		const tasksList = await response.json();
		if ( 200 <= status && status < 300)	dispatch(loadTask(tasksList))
	},[])
	const [filter, setFilter] = useState(0)
	const filteredTasks = useMemo(() => {
		if (filter === 0) return tasks;
		return tasks.filter(({isCompleted}) => filter === 2 ? isCompleted : !isCompleted);
	}, [tasks, filter]);
	return (
		<section className='todo'>
			<div className='_container'>
				<h1 className='heading'>Your todo list</h1>
				<div className={styles['block-todo']}>
					<TodoForm/>
					{!!tasks.length &&
					<>
						<div className={styles['todo__items']}>
							{filteredTasks.map((task, index) =>
								<TodoItem
									task={task}
									index={index}
									key={task._id}
								/>
							)}
						</div>
						<TodoBar
							filter={filter}
							onChangeFilter={(value) => setFilter(value)}/>
					</>
					}
				</div>
			</div>
		</section>
	)
}
export default Todo;