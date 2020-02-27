/** @format */

const customErrors = (err, req, res, next) => {
	res.status(err.status).send(err);
};

const invalidMethod = (req, res, next) => {
	res.status(405).send({ msg: "method not allowed" });
};

module.exports = { customErrors, invalidMethod };
