const crypto = require('crypto');

// show all supported hash algorithms
// console.log(crypto.getHashes());

// a simple demo
// console.log(crypto.createHash('md5')
// 	.update('hello')
// 	.digest('hex'));

module.exports = str => {
	return crypto.createHash('md5')
		.update('chris' + str)
		.digest('hex');
}