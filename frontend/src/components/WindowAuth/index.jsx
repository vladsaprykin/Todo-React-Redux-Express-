import React from 'react';
import styles from './.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, logOutUser } from '../../redux/user/action';

const WindowAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const logOutHandler = () => {
    if (window.gapi?.auth2?.getAuthInstance().isSignedIn.Sd === true) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }
    dispatch(logOutUser());
  };
  const deleteUserHandler = () => {
    dispatch(deleteUser());
  };
  return (
    <header className={styles['header']}>
      <div className={styles['window-auth']}>
        <div className={styles['window-auth__user']}>{user.username}</div>
        <div className={styles['window-auth__email']}>{user.email}</div>
        <button className={styles['window-auth__btn_log-out']} onClick={logOutHandler}>
          Log out
        </button>
        <button className={styles['window-auth__btn_delete-user']} onClick={deleteUserHandler}>
          Delete user
        </button>
      </div>
    </header>
  );
};
export default WindowAuth;
