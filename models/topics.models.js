/** @format */

const connection = require("../db/connection");

const getAllTopics = () => {
	return connection
		.select("*")
		.from("topics")
		.returning("*")
		.then((requestedTopics) => {
			return { topics: requestedTopics };
		});
};

module.exports = { getAllTopics };
