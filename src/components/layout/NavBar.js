import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/ContactContext';

const NavBar = () => {
	const context = useContext(AuthContext);
	const contactContext = useContext(ContactContext);
	const { user, isAuthenticated, logout, loadUser } = context;
	const { clearContacts } = contactContext;

	useEffect(() => {
		loadUser();
		//eslint-disable-next-line
	}, []);

	const onLogout = () => {
		logout();
		clearContacts();
	};

	const authLink = (
		<>
			<span className='text-center'>Olá {user && user.name}</span>
			<a onClick={onLogout} href='#!'>
				<i className='fas fa-sign-out-alt'></i>{' '}
				<span className='hide-sm'>Logut</span>
			</a>
		</>
	);
	const guestLink = (
		<>
			<Link to='/register'>Criar conta</Link>
			<Link to='/login'>
				<button className='btn light'>Login</button>
			</Link>
		</>
	);

	return (
		<nav className='navbar bg-primary'>
			<h1>
				<Link to='/'>
					<i className='far fa-address-book'></i> Contact Keeper
				</Link>
			</h1>
			<div>{isAuthenticated ? authLink : guestLink}</div>
		</nav>
	);
};

export default NavBar;
