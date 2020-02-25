/** @format */

const { getAllTopics } = require("../models/topics.models");

const requestAllTopics = (request, response, next) => {
	getAllTopics().then((topics) => {
		response.status(200).send(topics);
	});
};

module.exports = { requestAllTopics };
