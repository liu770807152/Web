const express = require('express');
const userCtrl = require('../controller/user');

const router = express.Router();

// authentication
router.post('/users/login', userCtrl.login);

// registration
router.post('/users', userCtrl.register);

// get current user
router.get('/user', userCtrl.getCurrentUser);

// update user
router.put('/user', userCtrl.updateCurrentUser);

module.exports = router;