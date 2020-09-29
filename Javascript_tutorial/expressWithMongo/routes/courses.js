const express = require('express');

const {
    addCourse,
    getCourse,
    getAllCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courses');

const router = express.Router();

router.get('/', getAllCourse);
router.get('/:id', getCourse);
router.post('/', addCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;