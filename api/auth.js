const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route         GET api/auth
// @description   Test route
// @access        Public
router.get('/', auth, async (request, response) => {
	try {
		const user = await User.findById(request.user.id).select('-password');
		response.json(user);
	} catch (error) {
		console.error(error.message);
		response.status(500).send('Server error');
	}
});

// @route         GET api/auth
// @description   User authentication | get jwt token
// @access        Public

router.post(
	'/',
	[
		check('email', 'Please use a valid email').isEmail(),
		check('password', 'Enter the valid password').exists(),
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
			if (!user) {
				return response
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials' }] });
			}

			const isValidPassword = await bcrypt.compare(password, user.password);

			if (!isValidPassword) {
				return response
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials' }] });
			}

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
