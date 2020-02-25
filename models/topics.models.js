/** @format */

const connection = require("../db/connection");

const getAllTopics = () => {
	return connection
		.select("*")
		.from("topics")
		.returning("*")
		.then((topics) => {
			console.log(topics);
		});
};

module.exports = { getAllTopics };
