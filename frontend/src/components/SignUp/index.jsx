import React, { useState } from 'react'
import styles from './.module.css'
import { GiVulture, GiAquarium, GiCrocJaws, GiDimetrodon } from 'react-icons/gi';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { openSignUp } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap'

const SignUp = () => {
	const dispatch = useDispatch();
	const [dataModal,setDataModal] = useState({
		isOpen: false,
		title: '',
		content: '',
	})
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
	})
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
		const regExpUserName = /^[a-zA-z]{1}[a-zA-Z1-9]{3,20}$/;
		const regExpMail = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const regExpPass = /^[A-Za-z]\w{6,20}$/;
		const userNameResult = regExpUserName.test(userName);
		const emailResult = regExpMail.test(email);
		const passwordResult = regExpPass.test(password) && password === passwordRepeat
		setValid((prev) => ({
			...prev,
			...{
				username: userNameResult,
				email: emailResult,
				password: passwordResult,
				passwordRepeat: passwordResult,
			},
		}));
		return userNameResult && emailResult && passwordResult
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return console.log('на валидации отвалился')
		const data = {
			username: dataForm.username,
			email: dataForm.email,
			password: dataForm.password
		};
		const response = await fetch('http://localhost:3001/users/create', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(data),
		});
		const status = await response.status;
		const user = await response.json();
		if (status === 400) {
			setDataModal((prev) => ({
				...prev,
				...{
					isOpen: true,
					title: 'Error',
					content: user.error
				},
			}));
			return
		}
		if (200 <= status && status < 300) {
			setDataModal((prev) => ({
				...prev,
				...{
					isOpen: true,
					title: 'Congratulations',
					content: 'Account created'
				},
			}));
		}
	}
	const handleModal = () => {
		setDataModal((prev) => ({
			...prev,
			...{
				isOpen: false,
				title: '',
				content: '',
			},
		}))
	}
	return (
		<div className={styles['sign-up-block']}>
			<Modal
				size='sm'
				show={dataModal.isOpen}
				onHide={handleModal}
				centered={true}
				aria-labelledby='example-modal-sizes-title-sm'
			>
				<Modal.Header closeButton>
					<Modal.Title id='example-modal-sizes-title-sm'>{dataModal.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{dataModal.content}</Modal.Body>
			</Modal>
			<form action='#' className={styles['form']} onSubmit={handleSubmit}>
				<div className={styles['form__title']}>Sign UP</div>
				<div className={styles['form__validate-input']}>
					<GiVulture size={30}/>
					<input
						name='username'
						placeholder='Username'
						required type='text'
						value={dataForm.username}
						onChange={handleUserInput}
					/>
					<div className={styles['form__validate-input__valid']}>{typeof valid.username === 'boolean' && <>{valid.username ? <AiOutlineCheck color='green'/> : <AiOutlineClose color='red'/>}</>}</div>
				</div>
				<div className={styles['form__validate-input']}>
					<GiAquarium size={30}/>
					<input
						name='email'
						placeholder='Email'
						required type='email'
						value={dataForm.email}
						onChange={handleUserInput}
					/>
					<div className={styles['form__validate-input__valid']}>{typeof valid.username === 'boolean' && <>{valid.email ? <AiOutlineCheck color='green'/> : <AiOutlineClose color='red'/>}</>}</div>
				</div>
				<div className={styles['form__validate-input']}>
					<GiCrocJaws size={30}/>
					<input
						name='password'
						placeholder='Password'
						required
						type='password'
						value={dataForm.password}
						onChange={handleUserInput}
					/>
					<div className={styles['form__validate-input__valid']}>{typeof valid.username === 'boolean' && <>{valid.password ? <AiOutlineCheck color='green'/> : <AiOutlineClose color='red'/>}</>}</div>
				</div>
				<div className={styles['form__validate-input']}>
					<GiDimetrodon size={30}/>
					<input
						name='passwordRepeat'
						placeholder='Password'
						required
						type='password'
						value={dataForm.passwordRepeat}
						onChange={handleUserInput}
					/>
					<div className={styles['form__validate-input__valid']}>{typeof valid.username === 'boolean' && <>{valid.passwordRepeat ? <AiOutlineCheck color='green'/> : <AiOutlineClose color='red'/>}</>}</div>
				</div>
				<div className={styles['form__submit']}>
					<button type='submit'>Sign Up</button>
				</div>
			</form>
			<div className={styles['sign-up-block__button']}>
				<button type='button' onClick={() => {
					dispatch(openSignUp(false))
				}}>Sign In
				</button>
			</div>
		</div>
	)
}
export default SignUp