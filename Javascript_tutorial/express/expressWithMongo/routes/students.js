const express = require('express');

const {
    addStudent,
    getStudent,
    getAllStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/students');

const router = express.Router();

router.get('/', getAllStudent);
router.get('/:id', getStudent);
router.post('/', addStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;