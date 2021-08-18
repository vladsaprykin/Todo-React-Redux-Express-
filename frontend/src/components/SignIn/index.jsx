import React, { useMemo, useState, useEffect } from 'react';
import styles from './.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, authenticatedUser, openSignUp } from '../../redux/actions';
import { Alert } from 'react-bootstrap';
import { history } from '../../index';

const SignIn = () => {
	const dispatch = useDispatch()
	const requestErrorDefault = {
		error: false,
		content: ''
	}
	const [requestError, setRequestError] = useState(requestErrorDefault);
	const [dataForm, setDataForm] = useState({
		email: '',
		password: '',
		formErrors: {email: '', password: ''},
		emailValid: false,
		passwordValid: false,
		formValid: false
	})
	useEffect(() => {
		setDataForm((prev) => ({
			...prev,
			...{
				formValid: dataForm.emailValid && dataForm.passwordValid
			},
		}));
	}, [dataForm.emailValid, dataForm.passwordValid])
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
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			email: dataForm.email,
			password: dataForm.password
		};
		const response = await fetch('http://localhost:3001/users/', {
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
			setRequestError({
				error: true,
				content: user.error
			});
			setTimeout(() => {
				setRequestError(requestErrorDefault);
			}, 5000)
			return
		}
		if (200 <= status && status < 300) {
			dispatch(authenticatedUser(true));
			dispatch(addUser(user));
			history.push('/todo');
		}
	}
	const validateField = (fieldName, value) => {
		const fieldValidationErrors = dataForm.formErrors;
		let emailValid = dataForm.emailValid;
		let passwordValid = dataForm.passwordValid;
		switch (fieldName) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
				fieldValidationErrors.email = emailValid ? '' : ' is invalid';
				break;
			case 'password':
				passwordValid = value.length >= 6;
				fieldValidationErrors.password = passwordValid ? '' : ' is too short';
				break;
			default:
				break;
		}
		setDataForm((prev) => ({
			...prev,
			...{
				formErrors: fieldValidationErrors,
				emailValid: emailValid,
				passwordValid: passwordValid
			},
		}));
	}
	return (
		<div className={styles['login-block']}>
			<form className={styles['login-block__form']} method='POST' onSubmit={handleSubmit}>
				<div className={styles['form__title']}>Sign In</div>
				{dataForm.formErrors.email.length > 0 &&
				<p className={styles['form__error']}>Email {dataForm.formErrors.email}</p>}
				<div className={styles['form__validate-input']}>
					<input
						required
						name='email'
						placeholder='Enter email'
						type='email'
						onChange={handleUserInput}
						value={dataForm.email}
					/>
				</div>
				{dataForm.formErrors.password.length > 0 &&
				<p className={styles['form__error']}>Password {dataForm.formErrors.password}</p>}
				<div className={styles['form__validate-input']}>
					<input
						required
						name='password'
						placeholder='Enter password'
						type='password'
						value={dataForm.password}
						onChange={handleUserInput}
					/>
				</div>
				{requestError.error && <Alert variant='danger'>{requestError.content}</Alert>}
				<div className={styles['form__submit']}>
					<button disabled={!dataForm.formValid} type='submit'>Sign In</button>
				</div>
			</form>
			<div className={styles['form__text-login-with']}>
				Or login with
			</div>
			<div className={styles['form__login-with']}>
				<a href='#'>
					<svg width='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M0 14.375C0 7.599 0 4.21 2.105 2.105 4.21 0 7.6 0 14.375 0h1.25c6.776 0 10.165 0 12.27 2.105C30 4.21 30 7.6 30 14.375v1.25c0 6.776 0 10.165-2.105 12.27C25.79 30 22.4 30 15.625 30h-1.25c-6.776 0-10.165 0-12.27-2.105C0 25.79 0 22.4 0 15.625v-1.25z'
							fill='#2787F5'/>
						<path fillRule='evenodd' clipRule='evenodd'
									d='M8.125 9.375H5.938c-.625 0-.75.294-.75.619 0 .579.741 3.453 3.453 7.253 1.807 2.596 4.354 4.003 6.671 4.003 1.391 0 1.563-.313 1.563-.85v-1.962c0-.625.132-.75.572-.75.325 0 .88.162 2.179 1.413 1.483 1.484 1.727 2.149 2.561 2.149h2.188c.625 0 .938-.313.757-.93-.197-.614-.905-1.506-1.845-2.563-.51-.602-1.274-1.251-1.506-1.576-.325-.417-.232-.602 0-.973 0 0 2.665-3.754 2.943-5.029.14-.463 0-.804-.662-.804h-2.187c-.556 0-.813.294-.952.619 0 0-1.112 2.711-2.688 4.472-.51.51-.742.673-1.02.673-.139 0-.34-.163-.34-.626v-4.334c0-.556-.161-.804-.625-.804h-3.438c-.347 0-.556.258-.556.503 0 .527.788.649.869 2.132v3.221c0 .707-.127.835-.406.835-.741 0-2.545-2.724-3.615-5.84-.21-.606-.42-.851-.979-.851z'
									fill='#fff'/>
					</svg>
				</a>
				<a href='#'>
					<svg width='30' height='30' xmlns='http://www.w3.org/2000/svg' id='Layer_1' x='0px' y='0px'
							 viewBox='73 0 267 266.9' enableBackground='new 73 0 267 266.9'>
						<path id='Blue_1_' fill='#157DC3'
									d='M321.1,262.3c7.9,0,14.2-6.4,14.2-14.2V18.8c0-7.9-6.4-14.2-14.2-14.2H91.8  C84,4.6,77.6,11,77.6,18.8v229.3c0,7.9,6.4,14.2,14.2,14.2H321.1z'/>
						<path id='f' fill='#FFFFFF'
									d='M255.4,262.3v-99.8h33.5l5-38.9h-38.5V98.8c0-11.3,3.1-18.9,19.3-18.9l20.6,0V45  c-3.6-0.5-15.8-1.5-30-1.5c-29.7,0-50,18.1-50,51.4v28.7h-33.6v38.9h33.6v99.8H255.4z'/>
					</svg>
				</a>
			</div>
			<div className={styles['form__text-signUp']}>
				<button type='button' onClick={() => {
					dispatch(openSignUp(true))
				}}>Sign Up
				</button>
			</div>
		</div>
	)
}
export default SignIn