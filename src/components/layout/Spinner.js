import React from 'react';

import spinner from '../../assets/img/spinner.gif';

const Spinner = () => {
	return (
		<>
			<img
				src={spinner}
				alt='Loadind...'
				style={{ width: '200px', margin: 'auto', display: 'block' }}
			/>
		</>
	);
};

export default Spinner;
