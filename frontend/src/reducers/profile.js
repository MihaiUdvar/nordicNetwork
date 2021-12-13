import {
	GET_PROFILE,
	GET_ALL_PROFILES,
	PROFILE_ERROR,
	CLEAR_PROFILE,
} from '../actions/constants';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
};

export default function profile(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
			return { ...state, profile: payload, loading: false };
		case GET_ALL_PROFILES:
			return { ...state, profiles: payload, loading: false };
		case PROFILE_ERROR:
			return { ...state, error: payload, profile: null, loading: false };
		case CLEAR_PROFILE:
			return { ...state, profile: null, loading: false };
		default:
			return state;
	}
}
