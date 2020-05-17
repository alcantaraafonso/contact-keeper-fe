import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/ContactContext'
const ContactFilter = () => {
	const context = useContext(ContactContext)
	const { filterContacts, clearFilter, filtered } = context

	//O Hook useRef é usado para manipular um objeto DOM
	const text = useRef('')

	const onChange = (event) => {
		if (text.current.value) {
			filterContacts(event.target.value)
		} else {
			clearFilter()
		}
	}

	useEffect(() => {
		if (filtered === null) {
			text.current.value = ''
		}
	}, [])

	return (
		<form>
			<input
				ref={text}
				type="text"
				placeholder="Filtrar por nome ou Email..."
				onChange={onChange}
			/>
		</form>
	)
}

export default ContactFilter
