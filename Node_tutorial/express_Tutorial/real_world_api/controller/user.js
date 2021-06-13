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
		// 2. validation (all done in the last middleware using express-validator)
		// 2.1 basic data validation
		// 2.2 database validation
		// 3. validation passed, store data to database
		let user = new User(req.body.user);
		await user.save();
		
		/* we don't wanna send back the password, se we delete it here.
		   However, returned object from mongoose is immutable!!! */
		// This will not work!!!
		delete user.password;
		/* So we must transform it to normal object */
		user = user.toJSON();
		// Now it works.
		delete user.password;

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