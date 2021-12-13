import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
} from './constants';

// register user
export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const config = {
			headers: { 'Content-Type': 'application/json' },
		};

		const body = JSON.stringify({ name, email, password });

		try {
			const response = await axios.post('/api/users', body, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: response.data,
			});

			dispatch({
				type: USER_LOADED,
				payload: response.data,
			});
		} catch (error) {
			const errors = error.response.data.errors;

			if (errors) {
				errors.forEach((error) => {
					dispatch(setAlert(error.msg, 'danger', 3000));
				});
			}
			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

// user loaded
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const response = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// login
export const login =
	({ email, password }) =>
	async (dispatch) => {
		const config = {
			headers: { 'Content-Type': 'application/json' },
		};

		const body = JSON.stringify({ email, password });

		try {
			const response = await axios.post('/api/auth', body, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: response.data,
			});
		} catch (error) {
			const errors = error.response.data.errors;

			if (errors) {
				errors.forEach((error) => {
					dispatch(setAlert(error.msg, 'danger', 3000));
				});
			}
			dispatch({
				type: LOGIN_FAIL,
			});
		}
	};

// logout / clear user details
export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};
