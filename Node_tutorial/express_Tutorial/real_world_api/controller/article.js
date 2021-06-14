const { Article, User } = require('../model');

exports.listArticle = async (req, res, next) => {
	try {
		const articlesCount = await Article.countDocuments();
		// 查询时实现分页
		const { limit = 20, offset = 0, tag, author } = req.query;
		// 筛选
		const filter = {};
		if (tag) {
			// Mongodb判断是否包含tag的值，而非等于！大小写敏感。
			filter.tagList = tag;
		}
		if (author) {
			// find author ID by author name
			const user = await User.findOne({ username: author });
			filter.author = user ? user._id : null;
		}
		const articles = await Article.find(filter)
			.skip(Number.parseInt(offset)) // 跳过多少条
			.limit(Number.parseInt(limit)) // 取多少条，取数据时就限制
			.sort({ // 规定顺序
				createdAt: -1 // 1 -> rising order; -1 -> reverse order
			});
		res.status(200).json({
			articles,
			articlesCount
		});
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
		// get model article
		const article = req.article;
		// get data from request body
		const bodyArticle = req.body.article;
		article.title = bodyArticle.title || article.title;
		article.description = bodyArticle.description || article.description;
		article.body = bodyArticle.body || article.body;
		await article.save();
		res.status(200).json({ // 201 -> created; 200 -> OK
			article
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteArticle = async (req, res, next) => {
	try {
		// get model article
		const article = req.article;
		await article.remove();
		// delete success -> 204
		res.status(204).end();
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