const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
	user: {
		// the user will be able to delete his own posts
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	title: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	// name of the user
	name: {
		type: String,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'users',
			},
		},
	],
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'users',
			},
			text: {
				type: String,
				required: true,
			},
			name: {
				type: String,
			},
			avatar: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

module.exports = Post = mongoose.model('post', PostSchema);
