const express = require('express');

const studentRoute = require('./routes/students');

const router = express.Router();

router.use('/students', studentRoute);

module.exports = router;