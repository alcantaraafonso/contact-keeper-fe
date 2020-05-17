import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/ContactContext'

const ContactForm = () => {
	const context = useContext(ContactContext)

	const { addContact, current, clearCurrent, updateContact } = context

	useEffect(() => {
		if (current !== null) {
			setContact(current)
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'pessoal',
			})
		}
	}, [context, current])
	//Os valores acima entre colchetes diz para o useEffect olhar por alterações nesse objeto e ser executado qdo houver alterações neles

	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'pessoal',
	})

	const { name, email, phone, type } = contact

	const onChange = (event) =>
		setContact({ ...contact, [event.target.name]: event.target.value })

	const onSubmit = (event) => {
		event.preventDefault()
		if (current) {
			updateContact(contact)
		} else {
			addContact(contact)
		}

		clearAll()
	}

	const clearAll = () => {
		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'pessoal',
		})
		clearCurrent()
	}
	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary">
				{current ? 'Editar' : 'Adicionar'} Contato
			</h2>
			<input
				type="text"
				name="name"
				placeholder="Nome"
				value={name}
				onChange={onChange}
			/>
			<input
				type="email"
				name="email"
				placeholder="E-mail"
				value={email}
				onChange={onChange}
			/>
			<input
				type="text"
				name="phone"
				placeholder="Telefone"
				value={phone}
				onChange={onChange}
			/>
			<h5>Tipo do Contato</h5>
			<input
				type="radio"
				name="type"
				value="pessoal"
				checked={type === 'pessoal'}
				onChange={onChange}
			/>{' '}
			Pessoal{' '}
			<input
				type="radio"
				name="type"
				value="profissional"
				checked={type === 'profissional'}
				onChange={onChange}
			/>{' '}
			Profissional{' '}
			<div>
				<input
					type="submit"
					value={current ? 'Editar' : 'Adicionar'}
					className="btn btn-primary btn-block"
				/>
			</div>
			{current && (
				<div>
					<button className="btn btn-light btn-block" onClick={clearAll}>
						Limpar formulário
					</button>
				</div>
			)}
		</form>
	)
}

export default ContactForm
