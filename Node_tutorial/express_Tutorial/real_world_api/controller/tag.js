exports.getTag = async (rea, res, next) => {
	try {
		res.send('get /tags');
	} catch (err) {
		next(err);
	}
};