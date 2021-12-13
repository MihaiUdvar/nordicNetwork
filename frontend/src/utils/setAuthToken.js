import axios from 'axios';

const setAuthToken = (token) => {
	// if local storage contains the token add it to headers request
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		// clear token from headers request
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

export default setAuthToken;
