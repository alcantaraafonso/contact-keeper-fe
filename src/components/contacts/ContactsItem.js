import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';

const ContactsItem = ({ contact }) => {
	const { _id, name, email, phone, type } = contact;

	const context = useContext(ContactContext);
	const { deleteContact, setCurrent, clearCurrent } = context;

	const onDelete = () => {
		deleteContact(_id);
		clearCurrent();
	};

	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{name}{' '}
				<span
					style={{ float: 'right' }}
					className={`badge badge-${
						type === `profissional` ? `success` : `primary`
					}`}
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
				<ul className='list'>
					{email && (
						<li>
							<i className='fas fa-envelope-open'></i> {email}
						</li>
					)}
					{phone && (
						<li>
							<i className='fas fa-phone'></i> {phone}
						</li>
					)}
				</ul>
				<p>
					<button
						className='btn btn-dark btn-sm'
						onClick={() => setCurrent(contact)}
					>
						Editar
					</button>
					<button className='btn btn-danger btn-sm' onClick={onDelete}>
						Apagar
					</button>
				</p>
			</h3>
		</div>
	);
};

ContactsItem.propType = {
	contact: PropTypes.object.isRequired
};

export default ContactsItem;
