const { validationResult, buildCheckFunction } = require('express-validator');
const { isValidObjectId } = require('mongoose');

// Parallel processing
// validations is an array that contains rules
exports = module.exports = validations => {
	return async (req, res, next) => {
		// 1. validate all data using imported validation rules
		await Promise.all(validations.map(validation => validation.run(req)));
		// 2. judge validation results
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}
		next();
	}
}

// add custom API
exports.isValidObjectId = (location, fields) => {
	return buildCheckFunction(location)(fields).custom(async value => {
		if (!isValidObjectId(value)) {
			// asynchronous failure
			return Promise.reject('ID type error!');

			// synchronous failure
			// throw new Error('article ID type error');
		}
		// synchronous success
		// return true;
	});
}