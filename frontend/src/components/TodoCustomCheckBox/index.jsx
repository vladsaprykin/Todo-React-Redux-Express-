import React from 'react';
import { toggleTask } from '../../redux/todo/action';
import { useDispatch } from 'react-redux';
import styles from './.module.css';

const TodoCustomCheckBox = ({ task }) => {
  const dispatch = useDispatch();
  const handleToggleTask = () => {
    dispatch(toggleTask(task));
  };
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
  );
};
export default TodoCustomCheckBox;
