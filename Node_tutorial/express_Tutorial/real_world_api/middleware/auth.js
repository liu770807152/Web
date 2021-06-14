const { verify } = require('../util/jwt');
const { jwtSecret } = require('../config/config.default');
const { User } = require('../model');

module.exports = async (req, res, next) => {
	// get authorization field from req.header
	let token = req.headers['authorization'];
	token = token ? token.split('Bearer ')[1] : null;
	// verify JWT, invalid -> 401; valid -> read info and add to req
	if (!token) {
		return res.status(401).end();
	}
	try {
		const decodedToken = await verify(token, jwtSecret);
		// if verification succeeds, add user info into req!!!
		req.user = await User.findById(decodedToken.userId);
		next();
	} catch (err) {
		return res.status(401).end();
	}
}