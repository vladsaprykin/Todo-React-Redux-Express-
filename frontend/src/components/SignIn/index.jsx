import React, { useState, useEffect } from 'react';
import styles from './.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { openSignUp, signInUserThunkCreator } from '../../redux/actions';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ReactComponent as VkSvg } from '../../assets/login/vk.svg';
import { ReactComponent as FacebookSvg } from '../../assets/login/facebook.svg';
import { regExpMail, regExpPass } from '../../helpers/utils';

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const requestError = useSelector((state) => state.requestError.signIn);
  const auth = useSelector((state) => state.user.authenticated);
  const [dataForm, setDataForm] = useState({
    email: '',
    password: '',
    formErrors: { email: '', password: '' },
    emailValid: false,
    passwordValid: false,
    formValid: false,
  });
  useEffect(() => {
    setDataForm((prev) => ({
      ...prev,
      ...{
        formValid: dataForm.emailValid && dataForm.passwordValid,
      },
    }));
  }, [dataForm.emailValid, dataForm.passwordValid]);
  useEffect(() => {
    if (auth === true) history.push('/todo', { update: true });
  }, [auth]);
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataForm((prev) => ({
      ...prev,
      ...{
        [name]: value,
      },
    }));
    validateField(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: dataForm.email,
      password: dataForm.password,
    };
    dispatch(signInUserThunkCreator(data));
  };
  const validateField = (fieldName, value) => {
    const fieldValidationErrors = dataForm.formErrors;
    let emailValid = dataForm.emailValid;
    let passwordValid = dataForm.passwordValid;
    switch (fieldName) {
      case 'email':
        emailValid = regExpMail.test(value);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = regExpPass.test(value);
        fieldValidationErrors.password = passwordValid ? '' : ' is too short or starts with a number';
        break;
      default:
        break;
    }
    setDataForm((prev) => ({
      ...prev,
      ...{
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
    }));
  };
  return (
    <div className={styles['login-block']}>
      <form className={styles['login-block__form']} method="POST" onSubmit={handleSubmit}>
        <div className={styles['form__title']}>Sign In</div>
        {dataForm.formErrors.email.length > 0 && (
          <p className={styles['form__error']}>Email {dataForm.formErrors.email}</p>
        )}
        <div className={styles['form__validate-input']}>
          <input
            required
            name="email"
            placeholder="Enter email"
            type="email"
            onChange={handleUserInput}
            value={dataForm.email}
          />
        </div>
        {dataForm.formErrors.password.length > 0 && (
          <p className={styles['form__error']}>Password {dataForm.formErrors.password}</p>
        )}
        <div className={styles['form__validate-input']}>
          <input
            required
            name="password"
            placeholder="Enter password"
            type="password"
            value={dataForm.password}
            onChange={handleUserInput}
          />
        </div>
        {requestError.error && <Alert variant="danger">{requestError.content}</Alert>}
        <div className={styles['form__submit']}>
          <button disabled={!dataForm.formValid} type="submit">
            Sign In
          </button>
        </div>
      </form>
      <div className={styles['form__text-login-with']}>Or login with</div>
      <div className={styles['form__login-with']}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">
          <VkSvg />
        </a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">
          <FacebookSvg />
        </a>
      </div>
      <div className={styles['form__text-signUp']}>
        <button
          type="button"
          onClick={() => {
            dispatch(openSignUp(true));
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default SignIn;
