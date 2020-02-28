/** @format */

const connection = require("../db/connection");

const getUser = (userUsername) => {
	return connection
		.select("*")
		.from("users")
		.where({ username: userUsername })
		.returning("*")
		.then((requestedUser) => {
			if (requestedUser.length === 0) {
				return Promise.reject({ status: 404, msg: "Username does not exist" });
			} else return requestedUser[0];
		});
};

module.exports = { getUser };
