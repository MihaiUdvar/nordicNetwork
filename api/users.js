const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route         GET api/users
// @description   Test route
// @access        Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please use a valid email').isEmail(),
		check(
			'password',
			'The password must contain at least 6 characters'
		).isLength({ min: 6 }),
	],
	async (request, response) => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = request.body;

		try {
			// check if user exists
			let user = await User.findOne({ email: email });
			if (user) {
				return response
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}
			// get gravatar
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});

			user = new User({ name, email, avatar, password });

			// encrypt the password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			// return jsonwebtoken
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					response.json({ token });
				}
			);

			// response.send('User registered');
		} catch (error) {
			console.error(error.message);
			response.status(500).send('Server error');
		}

		// response.send('Test Users Route');
	}
);

module.exports = router;
