/** @format */

const connection = require("../db/connection");

const getAllTopics = () => {
	return connection
		.select("*")
		.from("topics")
		.returning("*");
};

module.exports = { getAllTopics };
