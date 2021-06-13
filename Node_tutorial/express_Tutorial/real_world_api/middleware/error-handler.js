const util = require('util');

module.exports = () => {
	return (err, req, res, next) => {
		res.status(500).json({
			// 因为err对象存储的错误信息都在原型的属性上，而json()只能序列化对象本身的属性，因而必须使用util.format()才能看到错误信息！
			// 但是直接把错误信息暴露给外界是不安全的，所以
			error: util.format(err)
		});
	}
}