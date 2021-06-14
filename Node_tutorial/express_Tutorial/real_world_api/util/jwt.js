const jwt = require('jsonwebtoken');
const { promisify } = require('util');

/* manual */
// generate token synchronously
// console.log(jwt.sign({
// 	foo: 'bar' // payload
// }, 'signature', { expiresIn: '1h' }));

// generate token asynchronously
// jwt.sign({
// 	foo: 'bar'
// }, 'signature', { expiresIn: '1h' }, (err, token) => {
// 	if (err) {
// 		return console.error(err);
// 	}
// 	console.log(token);
// });

// verify token asynchronously
// jwt.verify('[header].[payload].[signature]', 'signature', (err, ret) => {
// 	if (err) {
// 		return console.error(err);
// 	}
// 	console.log(ret);
// });

// 不做验证就解析JWT
// jwt.decode()

/* use */
exports.sign = promisify(jwt.sign);

exports.verify = promisify(jwt.verify);

exports.decode = promisify(jwt.decode);