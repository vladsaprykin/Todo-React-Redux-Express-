import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoForm from '../../components/TodoForm';
import TodoBar from '../../components/TodoBar';
import TodoItem from '../../components/TodoItem';
import styles from './.module.css';
import { getTasksThunkCreator } from '../../redux/actions';

const Todo = () => {
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksThunkCreator());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [filter, setFilter] = useState(0);
  const filteredTasks = useMemo(() => {
    if (filter === 0) return tasks;
    return tasks.filter(({ isCompleted }) => (filter === 2 ? isCompleted : !isCompleted));
  }, [tasks, filter]);
  return (
    <section className="todo">
      <div className="_container">
        <h1 className="heading">Your todo list</h1>
        <div className={styles['block-todo']}>
          <TodoForm />
          {!!tasks.length && (
            <>
              <div className={styles['todo__items']}>
                {filteredTasks.map((task, index) => (
                  <TodoItem task={task} index={index} key={task._id} />
                ))}
              </div>
              <TodoBar filter={filter} onChangeFilter={(value) => setFilter(value)} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default Todo;
