/** @format */

const customErrors = (err, req, res, next) => {
	res.status(err.status).send(err);
};

module.exports = { customErrors };
