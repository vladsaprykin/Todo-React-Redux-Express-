import React, { useState, useEffect } from 'react';
import styles from './.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/user/action';
import { openSignUp } from '../../redux/toggleComponentSignUp/action';
import { useHistory } from 'react-router-dom';
import { ReactComponent as VkSvg } from '../../assets/login/vk.svg';
import { ReactComponent as GoogleSvg } from '../../assets/login/google.svg';
import { regExpMail, regExpPass } from '../../helpers/utils';
import * as types from '../../redux/user/constants';

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated, isLoading } = useSelector((state) => state.user);
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
    if (authenticated && !isLoading) history.push('/todo?filter=0');
  }, [authenticated]);
  useEffect(() => {
    const _onInit = (auth2) => {
      console.log('init OK', auth2);
    };
    const _onError = (err) => {
      console.log('error', err);
    };
    window.gapi.load('auth2', function () {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        })
        .then(_onInit, _onError);
    });
  }, []);
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
    dispatch(loginUser(data));
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
  const signInGoogle = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser) => {
      // метод возвращает объект пользователя
      // где есть все необходимые нам поля
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // не посылайте подобную информацию напрямую, на ваш сервер!
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());

      // токен
      const id_token = googleUser.getAuthResponse().id_token;
      console.log('ID Token: ' + id_token);
      const dataGoogle = {
        user: {
          username: profile.getGivenName(),
          email: profile.getEmail(),
        },
      };
      dispatch({
        type: types.LOGIN_USER_SUCCESS,
        payload: dataGoogle,
      });
    });
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
        <div className={styles['form__submit']}>
          <button disabled={!dataForm.formValid} type="submit">
            Sign In
          </button>
        </div>
      </form>
      <div className={styles['form__text-login-with']}>Or login with</div>
      <div className={styles['form__login-with']}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <button>
          <VkSvg />
        </button>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <button onClick={signInGoogle}>
          <GoogleSvg />
        </button>
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
