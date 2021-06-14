/**
 * check() checks data inside req.body & req.cookies & req.headers & erq.params & req.query
 * body() checks data inside req.body
 * param() hecks data inside req.params
 */
const { body, param, check, sanitize, checkSchema } = require("express-validator");
const validate = require("../middleware/validate");
const mongoose = require("mongoose");
const { Article } = require('../model');


exports.createArticle = validate([
	body('article.title').notEmpty().withMessage('title should bot be empty'),
	body('article.description').notEmpty().withMessage('description should bot be empty'),
	body('article.body').notEmpty().withMessage('body should bot be empty'),
]);

exports.getArticle = validate([
	// check if ID coincides with Mongodb ID format
	validate.isValidObjectId(['params'], 'articleId')
	// param('articleId')
		// .custom(async value => {
		// if (!mongoose.isValidObjectId(value)) {
		// 	// asynchronous failure
		// 	return Promise.reject('article ID type error');

		// 	// synchronous failure
		// 	// throw new Error('article ID type error');
		// }
		// // synchronous success
		// // return true;
	// })
]);

exports.updateArticle = [
	validate([
		// check if ID coincides with Mongodb ID format
		validate.isValidObjectId(['params'], 'articleId')
		// param('articleId')
		// 	.custom(async value => {
		// 	if (!mongoose.isValidObjectId(value)) {
		// 		// asynchronous failure
		// 		return Promise.reject('article ID type error');

		// 		// synchronous failure
		// 		// throw new Error('article ID type error');
		// 	}
		// 	// synchronous success
		// 	// return true;
		// })
	]),
	/* check if article exists */
	async (req, res, next) => {
		const articleId = req.params.articleId;
		const article = await Article.findById(articleId);
		req.article = article;
		if (!article) {
			return res.status(404).end();
		}
		next();
	},
	/* if exists, check if author is current user */
	async (req, res, next) => {
		// 坑: req.user._id is type "ObjectID"!!!
		// attention: model article is from req!!!
		if (req.user._id.toString() !== req.article.author.toString()) {
			// 没有权限403
			return res.status(403).end();
		}
		next();
	}
];

exports.deleteArticle = exports.updateArticle;
