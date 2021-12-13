const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../models/Profile');
const User = require('../models/User');

// @route         GET api/profile/me
// @description   get user profile
// @access        Public
router.get('/me', auth, async (request, response) => {
	try {
		const profile = await Profile.findOne({ user: request.user.id }).populate(
			'user',
			['name', 'avatar']
		);

		if (!profile) {
			return response.status(400).json({ msg: 'No profile for this user' });
		}

		response.json(profile);
	} catch (error) {
		console.error(error.message);
		response.status(500).send('Server error');
	}
});

// @route         POST api/profile
// @description   Create/Update Profile
// @access        Private
router.post(
	'/',
	[
		auth,
		[
			check('city', 'City is required').not().isEmpty(),
			check('gender', 'Gender is required').not().isEmpty(),
		],
	],
	async (request, response) => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		}

		const { phoneNumber, city, status, gender, nickname, creationDate } =
			request.body;

		// create profile object
		const profileFields = {};
		profileFields.user = request.user.id;
		if (phoneNumber) profileFields.phoneNumber = phoneNumber;
		if (city) profileFields.city = city;
		if (status) profileFields.status = status;
		if (gender) profileFields.gender = gender;
		if (nickname) profileFields.nickname = nickname;
		if (creationDate) profileFields.creationDate = creationDate;

		try {
			let profile = await Profile.findOne({ user: request.user.id });
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: request.user.id },
					{ $set: profileFields },
					{ new: true }
				);

				return response.json(profile);
			}

			// create
			profile = new Profile(profileFields);
			await profile.save();

			return response.json(profile);
		} catch (error) {}
	}
);

// @route         GET api/profile
// @description   Get All Profiles
// @access        Public
router.get('/', async (request, response) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		response.json(profiles);
	} catch (error) {
		console.error(error.message);
		response.status(500).send('Server error');
	}
});

// @route         GET api/profile/user/:user_id
// @description   Get profile by user id
// @access        Public
router.get('/user/:user_id', async (request, response) => {
	try {
		const profile = await Profile.findOne({
			user: request.params.user_id,
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return response
				.status(400)
				.json({ msg: 'No profile found for this user id' });
		}

		response.json(profile);
	} catch (error) {
		console.error(error.message);
		if (error.kind == 'ObjectId') {
			return response
				.status(400)
				.json({ msg: 'No profile found for this user id' });
		}
		response.status(500).send('Server error');
	}
});

// @route         DELETE api/profile
// @description   Delete profile, user and posts
// @access        Private
router.delete('/', auth, async (request, response) => {
	try {
		// remove profile
		await Profile.findOneAndRemove({ user: request.user.id });
		// remove user
		await User.findOneAndRemove({ _id: request.user.id });

		response.json({ msg: 'User deleted' });
	} catch (error) {
		console.error(error.message);
		response.status(500).send('Server error');
	}
});

module.exports = router;
