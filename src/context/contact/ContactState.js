import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';

import {
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR
} from '../types';

import { URL } from '../../utils/consts';

const ContactState = (props) => {
	

	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
		loading: true
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);

	//Get Contacts
	const getContacts = async () => {
		try {
			const res = await axios.get(`${URL}/api/contacts`);
			dispatch({ type: GET_CONTACTS, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	//Add Contact
	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post(`${URL}/api/contacts`, contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	//Delete Contact
	const deleteContact = async (id) => {
		try {
			const res = await axios.delete(`${URL}/api/contacts/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	//Update Contact
	const updateContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.put(
				`${URL}/api/contacts/${contact._id}`,
				contact,
				config
			);
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	//Set Current Contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	//Clea Current Contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	//Filter Contacts
	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};
	//Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	//Clear Filter
	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACTS });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				loading: state.loading,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
				getContacts
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
