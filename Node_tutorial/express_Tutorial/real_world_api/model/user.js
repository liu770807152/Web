const mongoose = require('mongoose');
// shared data fields
const baseModel = require('./base-model');
const md5 = require('../util/md5');

const userSchema = new mongoose.Schema({
	...baseModel,
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		set: value => md5(value), // crypto
		select: false // omit password for queries
	},
	bio: {
		type: String,
		default: null
	},
	image: {
		type: String,
		default: null
	}
});

module.exports = userSchema;
