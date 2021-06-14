const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// get user profile
router.get('/:username', auth, async (req, res, next) => {
	try {
		res.send('get /profiles/:username');

	} catch (err) {
		next(err);
	}
});

// follow user
router.post('/:username/follow', auth, async (req, res, next) => {
	try {
		res.send('post /profiles/:username/follow');

	} catch (err) {
		next(err);
	}
});

// unfollow user
router.delete('/:username/follow', auth, async (req, res, next) => {
	try {
		res.send('delete /profiles/:username/follow');

	} catch (err) {
		next(err);
	}
});

module.exports = router;