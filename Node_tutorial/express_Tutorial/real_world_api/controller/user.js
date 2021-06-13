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
		console.log(req.body);
		res.send('register');
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