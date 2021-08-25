import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoForm from '../../components/TodoForm';
import TodoBar from '../../components/TodoBar';
import TodoItem from '../../components/TodoItem';
import styles from './.module.css';
import { getTasks } from '../../redux/todo/action';
import { useHistory } from 'react-router-dom';
import { Loader } from '../../components/Loader';

const Todo = () => {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const { tasks, isLoading } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, []);
  const [filter, setFilter] = useState(parseInt(params.get('filter')));
  const filteredTasks = useMemo(() => {
    if (!filter) return tasks;
    return tasks.filter(({ isCompleted }) => (filter === 2 ? isCompleted : !isCompleted));
  }, [tasks, filter]);
  return (
    <section className="todo">
      <div className="_container">
        <h1 className="heading">Your todo list</h1>
        <div className={styles['block-todo']}>
          <TodoForm />
          {isLoading ? (
            <Loader />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default Todo;
