/** @format */

topicsRouter = require("express").Router();
const { requestAllTopics } = require("../controllers/topics.controllers");
const { invalidMethod } = require("../errors/errors");

topicsRouter
	.route("/")
	.get(requestAllTopics)
	.all(invalidMethod);

module.exports = topicsRouter;
