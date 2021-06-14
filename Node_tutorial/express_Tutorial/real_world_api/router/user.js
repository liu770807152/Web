const express = require('express');
const userCtrl = require('../controller/user');
// const { body, validationResult, check, sanitize, checkSchema } = require('express-validator');
const userValidator = require('../validator/user');
const auth = require('../middleware/auth');


const router = express.Router();

// authentication
// if validation is passed, hand in to controller
router.post('/users/login', userValidator.login, userCtrl.login);

// registration
// if validation is passed, hand in to controller
router.post('/users', userValidator.register, userCtrl.register); 

// get current user
router.get('/user', auth, userCtrl.getCurrentUser);

// update user
router.put('/user', auth, userCtrl.updateCurrentUser);

module.exports = router;