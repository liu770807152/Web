const { validationResult } = require('express-validator');

// Parallel processing
// validations is an array that contains rules
module.exports = validations => {
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