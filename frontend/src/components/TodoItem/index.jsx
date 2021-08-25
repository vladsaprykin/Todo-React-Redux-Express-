import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../redux/todo/action';
import TodoCustomCheckBox from '../TodoCustomCheckBox';
import styles from './.module.css';

const TodoItem = ({ task }) => {
  const dispatch = useDispatch();
  const handleDeleteTask = () => {
    dispatch(deleteTask(task._id));
  };
  return (
    <div className={styles['todo__item']}>
      <TodoCustomCheckBox task={task} />
      <span className={styles['todo__item__text']}>{task.todo}</span>
      <BsFillTrashFill color="#c6c4c6" onClick={() => handleDeleteTask()} cursor="pointer" />
    </div>
  );
};
export default TodoItem;
