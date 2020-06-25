import React, { useReducer } from 'react';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
	SET_ALERT,
	REMOVE_ALERT,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

import { URL } from '../../utils/consts';

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: false,
		loading: true,
		error: null,
		user: null
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	//laod user
	const loadUser = async () => {
		setAuthToken(localStorage.token);

		try {
			const res = await axios.get(`${URL}/api/auth`);

			dispatch({
				type: USER_LOADED,
				payload: res.data
			});
		} catch (error) {
			dispatch({
				type: AUTH_ERROR
			});
		}
	};

	//Register User
	const registerUser = async (user) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post(`${URL}/api/users`, user, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});

			loadUser();
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.msg
			});
		}
	};
	//login user
	const login = async (user) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post(`${URL}/api/auth`, user, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});

			loadUser();
		} catch (error) {
			dispatch({
				type: LOGIN_FAIL,
				payload: error.response.data.msg
			});
		}
	};

	//logout user
	const logout = () => dispatch({ type: LOGOUT });

	//clear Errors
	const clearErrors = () => {
		dispatch({
			type: CLEAR_ERRORS
		});
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				user: state.user,
				registerUser,
				loadUser,
				login,
				logout,
				clearErrors
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
