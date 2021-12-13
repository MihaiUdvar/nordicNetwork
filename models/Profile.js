const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	phoneNumber: {
		type: String,
	},
	city: {
		type: String,
	},
	status: {
		type: String,
	},
	gender: {
		type: String,
	},
	nickname: {
		type: String,
	},
	creationDate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
