const mongoose = require("mongoose");
const { dbUri } = require('../config/config.default');

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", err => {
	console.log('Mongodb connection failure! ', err);
});
db.once("open", function () {
  // we're connected!
	console.log("Mongodb connected!")
});

module.exports = {
  User: mongoose.model('User', require('./user')),
  Article: mongoose.model('Article', require('./article'))
}

