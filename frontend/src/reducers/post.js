import {
	ADD_POST,
	GET_POSTS,
	POST_ERROR,
	DELETE_POST,
	UPDATE_LIKES,
} from '../actions/constants';

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {},
};

export default function posts(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_POST:
			return {
				...state,
				// add the new post from the payload into the array of posts
				posts: [payload, ...state.posts],
				loading: false,
			};
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false,
			};
		case DELETE_POST:
			return {
				...state,
				// the list of post that does not contain the deleted one
				posts: state.posts.filter((post) => post._id !== payload),
				loading: false,
			};
		case UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.id ? { ...post, likes: payload.likes } : post
				),
				loading: false,
			};
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};

		default:
			return state;
	}
}
