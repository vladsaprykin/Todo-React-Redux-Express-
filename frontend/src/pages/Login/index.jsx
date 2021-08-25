import React from 'react';
import styles from './.module.css';
import SignIn from '../../components/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from '../../components/SignUp';
import { Modal } from 'react-bootstrap';
import { openSignUp } from '../../redux/toggleComponentSignUp/action';
import { removeErrorRequest } from '../../redux/user/action';

const Login = () => {
  const dispatch = useDispatch();
  const signUpOpen = useSelector((state) => state.signUp.signUpOpen);
  const dataModal = useSelector((state) => state.user.message);
  const handleModal = () => {
    dispatch(removeErrorRequest());
    if (signUpOpen && dataModal.type !== 'Error') return dispatch(openSignUp(false));
  };
  return (
    <section className={styles['login']}>
      {!signUpOpen && <SignIn />}
      {signUpOpen && <SignUp />}
      <Modal
        size="sm"
        show={dataModal.isOpenModal}
        onHide={handleModal}
        centered={true}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">{dataModal.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{dataModal.content}</Modal.Body>
      </Modal>
    </section>
  );
};
export default Login;
