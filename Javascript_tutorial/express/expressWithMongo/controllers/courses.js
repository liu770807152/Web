const Course = require('../models/course');

async function addCourse(req, res) {
    const { name, code, description } = req.body;
    let id = 1;
    // const course = new Course(
    //    { _id: 'COMP6710', name: 'Java' }
    //);
    const course = new Course({ _id: id++, name, code, description });
    await course.save();
    return res.status(201).json(course);
}

async function getCourse(req, res) {
    const { id: code } = req.params;
    const course = await Course.findById(code);
    if (!course) {
      return res.status(404).json('course not found');
    }
    return res.json(course);
}

async function getAllCourse(req, res) {
    // 旧写法:
    // Course.find((err, result) => {
    //   if (err) res.status(400).json(err);
    //   res.json(result);
    // });
    const courses = await Course.find().sort().exec(); // 推荐在最后追加exec以提高效率
    // json(courses)标准化输出格式为： 
    // {status: 'ok', data: courses, error: err}
    return res.json(courses);
}

async function updateCourse(req, res) {
    const { id: id } = req.params;
    const { name, description, code } = req.body;
    // 别用 await Course.findByIdAndUpdate(id, req.body, {new:true})
    // 有可能误改不能改的数据
    const course = await Course.findByIdAndUpdate(
      id,
      { name, description, code },
      { new: true }
    );

    // 或者
    // const course = await Course.findById(code);
    // if (!course) {
    //   return res.status(404).json('course not found');
    // }
    // course.name = name;
    // course.description = description;
    // await course.save();

    if (!course) {
      return res.status(404).json('course not found');
    }
    return res.json(course);
}

async function deleteCourse(req, res) {
    const { id: code } = req.params;
    const course = await Course.findByIdAndDelete(code);
    if (!course) {
      return res.status(404).json('course not found');
    }
    
    return res.sendStatus(204);
    // 204指的是no content，因此返回不了course
    // return res.status(204).json(course);
}

module.exports = {
    addCourse,
    getCourse,
    getAllCourse,
    updateCourse,
    deleteCourse
};