/**
 * check() checks data inside req.body & req.cookies & req.headers & erq.params & req.query
 * body() checks data inside req.body
 * param() hecks data inside req.params
 */
const { body, param, check, sanitize, checkSchema } = require("express-validator");
const validate = require("../middleware/validate");
const mongoose = require("mongoose");


exports.createArticle = validate([
	body('article.title').notEmpty().withMessage('title should bot be empty'),
	body('article.description').notEmpty().withMessage('description should bot be empty'),
	body('article.body').notEmpty().withMessage('body should bot be empty'),
]);

exports.getArticle = validate([
	// check if ID coincides with Mongodb ID format
	param('articleId').custom(async value => {
		if (!mongoose.isValidObjectId(value)) {
			// asynchronous failure
			return Promise.reject('article ID type error');

			// synchronous failure
			// throw new Error('article ID type error');
		}
		// synchronous success
		// return true;
	})
]);