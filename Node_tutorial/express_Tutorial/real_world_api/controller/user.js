const { User } = require('../model');

// authentication
exports.login = async (req, res, next) => {
	try {
		res.send('post /users/login');

	} catch (err) {
		next(err);
	}
};

// registration
exports.register = async (req, res, next) => {
	try {
		// 1. get req.body
		console.log(req.body);
		// 2. verification
		// 2.1 basic data verification
		// 2.2 database verification
		
		// 3. verification passed, store data to database
		const user = new User(req.body.user);
		await user.save();
		// 4. send success response
		res.status(201).json({
			user
		});
	} catch (err) {
		next(err);
	}
};

// get current user
exports.getCurrentUser = async (req, res, next) => {
	try {
		res.send('get /user');

	} catch (err) {
		next(err);
	}
};

exports.updateCurrentUser = async (req, res, next) => {
	try {
		res.send('put /user');

	} catch (err) {
		next(err);
	}
};