import React, { Fragment } from 'react';
import spinner from '../../images/spinner.gif';

const Spinner = (props) => {
	return (
		<Fragment>
			<img
				src={spinner}
				style={{ width: '400px', margin: 'auto', display: 'block' }}
				alt=""
			/>
		</Fragment>
	);
};

export default Spinner;
