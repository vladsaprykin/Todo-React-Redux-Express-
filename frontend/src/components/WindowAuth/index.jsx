import React, { useState } from 'react';
import styles from './.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, logOutUser } from '../../redux/user/action';
import { Button, Modal } from 'react-bootstrap';

const WindowAuth = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
        <button className={styles['window-auth__btn_delete-user']} onClick={handleShow}>
          Delete user
        </button>
      </div>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={deleteUserHandler}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};
export default WindowAuth;
