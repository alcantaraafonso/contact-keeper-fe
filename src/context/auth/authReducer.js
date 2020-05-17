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
	CLEAR_ERRORS,
} from '../types'

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS: {
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				token: action.payload,
				isAuthenticated: true,
				loading: false,
			}
		}
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT: {
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: true,
				error: action.payload,
			}
		}
		case CLEAR_ERRORS: {
			return {
				...state,
				errror: null,
				isAuthenticated: false,
				loading: true,
			}
		}
		case USER_LOADED: {
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				loading: false,
			}
		}
		default:
			return state
	}
}
