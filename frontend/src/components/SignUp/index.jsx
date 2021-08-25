import React, { useState } from 'react';
import styles from './.module.css';
import { GiVulture, GiAquarium, GiCrocJaws, GiDimetrodon } from 'react-icons/gi';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { openSignUp } from '../../redux/toggleComponentSignUp/action';
import { createUser } from '../../redux/user/action';
import { useDispatch } from 'react-redux';
import { regExpMail, regExpPass, regExpUserName } from '../../helpers/utils';

const SignUp = () => {
  const dispatch = useDispatch();
  const [dataForm, setDataForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });
  const [valid, setValid] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataForm((prev) => ({
      ...prev,
      ...{
        [name]: value,
      },
    }));
  };
  const validateForm = () => {
    const userName = dataForm.username;
    const email = dataForm.email;
    const password = dataForm.password;
    const passwordRepeat = dataForm.passwordRepeat;
    const userNameResult = regExpUserName.test(userName);
    const emailResult = regExpMail.test(email);
    const passwordResult = regExpPass.test(password) && password === passwordRepeat;
    setValid((prev) => ({
      ...prev,
      ...{
        username: userNameResult,
        email: emailResult,
        password: passwordResult,
        passwordRepeat: passwordResult,
      },
    }));
    return userNameResult && emailResult && passwordResult;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const data = {
      username: dataForm.username,
      email: dataForm.email,
      password: dataForm.password,
    };
    dispatch(createUser(data));
  };

  return (
    <div className={styles['sign-up-block']}>
      <form action="#" className={styles['form']} onSubmit={handleSubmit}>
        <div className={styles['form__title']}>Sign UP</div>
        <div className={styles['form__validate-input']}>
          <GiVulture size={30} />
          <input
            name="username"
            placeholder="Username"
            required
            type="text"
            value={dataForm.username}
            onChange={handleUserInput}
          />
          <div className={styles['form__validate-input__valid']}>
            {typeof valid.username === 'boolean' && (
              <>{valid.username ? <AiOutlineCheck color="green" /> : <AiOutlineClose color="red" />}</>
            )}
          </div>
        </div>
        <div className={styles['form__validate-input']}>
          <GiAquarium size={30} />
          <input
            name="email"
            placeholder="Email"
            required
            type="email"
            value={dataForm.email}
            onChange={handleUserInput}
          />
          <div className={styles['form__validate-input__valid']}>
            {typeof valid.username === 'boolean' && (
              <>{valid.email ? <AiOutlineCheck color="green" /> : <AiOutlineClose color="red" />}</>
            )}
          </div>
        </div>
        <div className={styles['form__validate-input']}>
          <GiCrocJaws size={30} />
          <input
            name="password"
            placeholder="Password"
            required
            type="password"
            value={dataForm.password}
            onChange={handleUserInput}
          />
          <div className={styles['form__validate-input__valid']}>
            {typeof valid.username === 'boolean' && (
              <>{valid.password ? <AiOutlineCheck color="green" /> : <AiOutlineClose color="red" />}</>
            )}
          </div>
        </div>
        <div className={styles['form__validate-input']}>
          <GiDimetrodon size={30} />
          <input
            name="passwordRepeat"
            placeholder="Password"
            required
            type="password"
            value={dataForm.passwordRepeat}
            onChange={handleUserInput}
          />
          <div className={styles['form__validate-input__valid']}>
            {typeof valid.username === 'boolean' && (
              <>{valid.passwordRepeat ? <AiOutlineCheck color="green" /> : <AiOutlineClose color="red" />}</>
            )}
          </div>
        </div>
        <div className={styles['form__submit']}>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div className={styles['sign-up-block__button']}>
        <button
          type="button"
          onClick={() => {
            dispatch(openSignUp(false));
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
export default SignUp;
