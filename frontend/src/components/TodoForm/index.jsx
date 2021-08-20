import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTaskThunkCreator } from '../../redux/actions';
import styles from './.module.css';

const TodoForm = () => {
  const dispatch = useDispatch();
  const [valueInput, setValueInput] = useState('');
  const handleChange = (event) => {
    setValueInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setTaskThunkCreator(valueInput));
    setValueInput('');
  };
  return (
    <form className={styles['todo__form']} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles['form__input']}
        name="todo"
        value={valueInput}
        onChange={handleChange}
        placeholder="Enter your task name here"
        required
        minLength="3"
      />
    </form>
  );
};
export default TodoForm;
