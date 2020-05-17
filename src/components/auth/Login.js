import React, { useState, useContext, useEffect } from 'react'

import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/AlertContext'

const Login = (props) => {
	const authContext = useContext(AuthContext)
	const alertContext = useContext(AlertContext)

	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const { email, password } = user
	const { setAlert } = alertContext
	const { login, error, clearErrors, isAuthenticated } = authContext
	const onChange = (event) => {
		setUser({ ...user, [event.target.name]: event.target.value })
	}

	const onSubmit = (event) => {
		event.preventDefault()

		if (email === '' || password === '') {
			setAlert('Por favor, preencha os campos de email e senha', 'danger')
		} else {
			login({
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

		if (error === 'Credencial inválida') {
			setAlert(error, 'danger')
			clearErrors()
		}

		//eslint-disable-next-line
	}, [error, isAuthenticated, props.history])

	return (
		<div className="form-container">
			<h1>
				<span className="text-primary">Contectar-se </span>a sua conta
			</h1>
			<form onSubmit={onSubmit}>
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
				<input
					type="submit"
					value="Entrar"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	)
}

export default Login
