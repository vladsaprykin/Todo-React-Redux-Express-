import React from 'react';
import styles from './.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../redux/actions';

const WindowAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const logOut = () => {
    if (window.gapi.auth2.getAuthInstance().isSignedIn.Sd === true) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }
    dispatch(logOutUser());
  };
  return (
    <header className={styles['header']}>
      <div className={styles['window-auth']}>
        <div className={styles['window-auth__user']}>{user.username}</div>
        <div className={styles['window-auth__email']}>{user.email}</div>
        <button className={styles['window-auth__btn']} onClick={logOut}>
          Log out
        </button>
      </div>
    </header>
  );
};
export default WindowAuth;
