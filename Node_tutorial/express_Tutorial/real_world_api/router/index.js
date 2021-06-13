const express = require('express');

const router = express.Router();

// user related routers
router.use(require('./user'));

// profile related routers
router.use('/profiles', require('./profile'));

// article related routers
router.use('/articles', require('./article'));

// tag related routers
router.use('/tags', require('./tag'));

module.exports = router;