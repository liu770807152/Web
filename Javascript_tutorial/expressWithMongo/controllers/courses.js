const Course = require('../models/course');

async function addCourse(req, res) {
    const course = new Course(
        { _id: 'MATH101', name: 'Intro to math' }
    );
    await course.save();
    return res.json(course);
}

function getCourse(req, res) {}

async function getAllCourse(req, res) {
    // 旧写法
    // Course.find((err, result) => {
    //   if (err) res.status(400).json(err);
    //   res.json(result);
    // });
    // 推荐在最后追加exec以提高效率
    const courses = await Course.find().sort().exec();
    // json(courses)标准化输出格式为： 
    // {status: 'ok', data: courses, error: err}
    return res.json(courses);
}

function updateCourse(req, res) {}

function deleteCourse(req, res) {}

module.exports = {
    addCourse,
    getCourse,
    getAllCourse,
    updateCourse,
    deleteCourse
};