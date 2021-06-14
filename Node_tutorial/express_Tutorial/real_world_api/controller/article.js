const { Article } = require('../model');

exports.listArticle = async (req, res, next) => {
	try {
		res.send('get /articles');

	} catch (err) {
		next(err);
	}
};

exports.feedArticle = async (req, res, next) => {
	try {
		res.send('post /articles/feed');

	} catch (err) {
		next(err);
	}
};

exports.getArticle = async (req, res, next) => {
	try {
		const article = await Article.findById(req.params.articleId)
			.populate('author'); // "get" query does not need exec()
		if (!article) {
			return res.status(404).end();
		}
		res.status(200).json({
			article
		});
	} catch (err) {
		next(err);
	}
};

exports.getCommentFromArticle = async (req, res, next) => {
	try {
		res.send('get /articles/:slug/comments');

	} catch (err) {
		next(err);
	}
};

exports.createArticle = async (req, res, next) => {
	try {
		const article = new Article(req.body.article);
		article.author = req.user._id;
		// "author" in model is still ID, but we can use populate() to find it in User
		article.populate('author').execPopulate();
		await article.save();
		res.status(201).json({
			article
		});
	} catch (err) {
		next(err);
	}
};

exports.addCommentToArticle = async (req, res, next) => {
	try {
		res.send('post /articles/:slug/comments');

	} catch (err) {
		next(err);
	}
};

exports.favoriteArticle = async (req, res, next) => {
	try {
		res.send('post /articles/:slug/favorite');

	} catch (err) {
		next(err);
	}
};

exports.updateArticle = async (req, res, next) => {
	try {
		res.send('put /articles/:slug');

	} catch (err) {
		next(err);
	}
};

exports.deleteArticle = async (req, res, next) => {
	try {
		res.send('delete /articles/:slug');

	} catch (err) {
		next(err);
	}
};

exports.deleteComment = async (req, res, next) => {
	try {
		res.send('delete /articles/:slug/comments/:id');

	} catch (err) {
		next(err);
	}
};

exports.unfavoriteArticle = async (req, res, next) => {
	try {
		res.send('delete /articles/:slug/favorite');

	} catch (err) {
		next(err);
	}
};