import React, { useState, useContext, useEffect } from 'react'

import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/AlertContext'
import { CLEAR_ERRORS } from '../../context/types'

const Register = (props) => {
	const authContext = useContext(AuthContext)
	const alertContext = useContext(AlertContext)

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	})

	const { name, email, password, password2 } = user
	const { setAlert } = alertContext
	const { registerUser, error, clearErrors, isAuthenticated } = authContext

	const onChange = (event) => {
		setUser({ ...user, [event.target.name]: event.target.value })
	}

	const onSubmit = (event) => {
		event.preventDefault()
		if (name === '' || email === '' || password === '') {
			setAlert('Por favor, digite todos os campos', 'danger')
		} else if (password !== password2) {
			setAlert('As senhas não conferem', 'danger')
		} else {
			registerUser({
				name,
				email,
				password,
			})
		}
	}

	useEffect(() => {
		//Empurrando para outra rota! Redirect
		if (isAuthenticated) {
			props.history.push('/')
		}

		if (error === 'Usuário já existe') {
			setAlert(error, 'danger')
			clearErrors()
		}

		//eslint-disable-next-line
	}, [error, isAuthenticated, props.history])

	return (
		<div className="form-container">
			<h1>
				<span className="text-primary">Abertura </span>de conta
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Nome</label>
					<input
						type="text"
						name="name"
						id="name"
						value={name}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">E-mail</label>
					<input
						type="text"
						name="email"
						id="email"
						value={email}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Senha</label>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password2">Confirmar a senha</label>
					<input
						type="password"
						name="password2"
						id="password2"
						value={password2}
						onChange={onChange}
					/>
				</div>
				<input
					type="submit"
					value="Criar conta"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	)
}

export default Register
