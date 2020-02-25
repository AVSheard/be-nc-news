/** @format */

const { getUser } = require("../models/users.models");

const requestUser = (request, response, next) => {
	getUser(request.params.username)
		.then((user) => {
			response.status(200).send(user);
		})
		.catch((err) => {
			// console.log(err);
			next(err);
		});
};

module.exports = { requestUser };
