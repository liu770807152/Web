const express = require('express');
const articleCtrl = require('../controller/article');

const router = express.Router();

// list articles
router.get('/', articleCtrl.listArticle);

// feed articles
router.get('/feed', articleCtrl.feedArticle);

// get article
router.get('/:slug', articleCtrl.getArticle);

// get comments from an article
router.get('/:slug/comments', articleCtrl.getCommentFromArticle);

// create article
router.post('/', articleCtrl.createArticle);

// add comments to an article
router.post('/:slug/comments', articleCtrl.addCommentToArticle);

// favorite article
router.post('/:slug/favorite', articleCtrl.favoriteArticle);

// update article
router.put('/:slug', articleCtrl.updateArticle);

// delete article
router.delete('/:slug', articleCtrl.deleteArticle);

// delete comment
router.delete('/:slug/comments/:id', articleCtrl.deleteComment);

// unfavorite article
router.delete('/:slug/favorite', articleCtrl.unfavoriteArticle);

module.exports = router;