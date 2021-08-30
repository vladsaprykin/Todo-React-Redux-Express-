import React, { useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { changeTask, deleteTask } from '../../redux/todo/action';
import TodoCustomCheckBox from '../TodoCustomCheckBox';
import styles from './.module.css';

const TodoItem = ({ task }) => {
  const dispatch = useDispatch();

  const animationDelete = (e) => {
    const task = e.target.parentElement;
    task.style.height = '50px';
  };
  const handleDeleteTask = async (e) => {
    const result = await dispatch(deleteTask(task._id));
    if (result.type === 'TASK/DELETE_TASK_SUCCESS') animationDelete(e);
    //todo Доделать анимацию удаления таска
  };
  const [openTextArea, setOpenTextArea] = useState(false);
  const [textAreaText, seTextAreaText] = useState('');
  const openEditor = (e) => {
    if (task.isCompleted) return;
    e.preventDefault();
    setOpenTextArea(true);
    seTextAreaText(task.todo);
  };
  const handleChange = (e) => {
    seTextAreaText(e.target.value);
  };
  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      dispatch(changeTask(task._id, { todo: textAreaText }));
      setOpenTextArea(false);
    }
    if (event.keyCode === 27) {
      setOpenTextArea(false);
    }
  };
  return (
    <div className={styles['todo__item']}>
      <TodoCustomCheckBox task={task} />
      {!openTextArea ? (
        <div className={styles['todo__item__text']} onClick={(e) => openEditor(e)}>
          {task.todo}
        </div>
      ) : (
        <input type="text" value={textAreaText} onChange={handleChange} onKeyDown={handleEnter} />
      )}

      <BsFillTrashFill color="#c6c4c6" onClick={(e) => handleDeleteTask(e)} cursor="pointer" />
    </div>
  );
};
export default TodoItem;
