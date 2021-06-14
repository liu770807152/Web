const express = require('express');
const articleCtrl = require('../controller/article');
const auth = require('../middleware/auth');
const articleValidator = require('../validator/article');

const router = express.Router();

// list articles
router.get('/', articleCtrl.listArticle);

// feed articles
router.get('/feed', auth, articleCtrl.feedArticle);

// get article
router.get('/:articleId', articleValidator.getArticle, articleCtrl.getArticle);

// get comments from an article
router.get('/:articleId/comments', articleCtrl.getCommentFromArticle);

// create article
router.post('/', auth, articleValidator.createArticle, articleCtrl.createArticle);

// add comments to an article
router.post('/:articleId/comments', articleCtrl.addCommentToArticle);

// favorite article
router.post('/:articleId/favorite', auth, articleCtrl.favoriteArticle);

// update article
router.put('/:articleId', auth, articleValidator.updateArticle, articleCtrl.updateArticle);

// delete article
router.delete('/:articleId', auth, articleValidator.deleteArticle, articleCtrl.deleteArticle);

// delete comment
router.delete('/:articleId/comments/:id', auth, articleCtrl.deleteComment);

// unfavorite article
router.delete('/:articleId/favorite', auth, articleCtrl.unfavoriteArticle);

module.exports = router;