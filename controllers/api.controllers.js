/** @format */
const data = require("../endpoints.json");

const requestJSON = (request, response, next) => {
	response.status(200).send({ data });
};

module.exports = { requestJSON };
