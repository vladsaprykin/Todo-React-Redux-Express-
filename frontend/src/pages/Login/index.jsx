import React from 'react';
import styles from './.module.css';
import SignIn from '../../components/SignIn';
import { useSelector } from 'react-redux';
import SignUp from '../../components/SignUp';

const Login = () => {
  const signUpOpen = useSelector((state) => state.signUp.signUpOpen);
  return (
    <section className={styles['login']}>
      {!signUpOpen && <SignIn />}
      {signUpOpen && <SignUp />}
    </section>
  );
};
export default Login;
