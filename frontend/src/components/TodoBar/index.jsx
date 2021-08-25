import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completeAllTasks, deleteCompletedTasks } from '../../redux/todo/action';
import styles from './.module.css';
import { useHistory } from 'react-router-dom';
const classNames = require('classnames');

const TodoBar = ({ filter, onChangeFilter }) => {
  const history = useHistory();
  const btnCenterFilter = [
    { text: 'All', count: 0 },
    { text: 'ToDo', count: 1 },
    { text: 'Completed', count: 2 },
  ];
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todo.tasks);
  const countNotCompletedTasks = useMemo(() => {
    return tasks.filter((item) => !item.isCompleted).length;
  }, [tasks]);
  const handleCompleteAllTasks = () => {
    dispatch(completeAllTasks());
  };
  const handleClearCompleteTasks = () => {
    dispatch(deleteCompletedTasks());
  };
  const changeFilter = (count) => {
    history.push(`/todo?filter=${count}`);
    onChangeFilter(count);
  };
  return (
    <div className={styles['todo__bar']}>
      <div className={styles['todo__bar__btn-left']} onClick={() => handleCompleteAllTasks()}>
        {countNotCompletedTasks} tasks left
      </div>
      <div className={styles['todo__bar__btn-center']}>
        {btnCenterFilter.map((item, index) => {
          return (
            <div
              key={index}
              className={classNames(styles['todo__bar__btn-center_filter'], {
                [styles['active-btn']]: filter === item.count,
              })}
              onClick={() => changeFilter(item.count)}
            >
              {item.text}
            </div>
          );
        })}
      </div>
      <div className={styles['todo__bar__btn-right']}>
        {countNotCompletedTasks !== tasks.length && (
          <div className={styles['todo__bar__btn_clear-completed']} onClick={() => handleClearCompleteTasks()}>
            Clear completed
          </div>
        )}
      </div>
    </div>
  );
};
export default TodoBar;
