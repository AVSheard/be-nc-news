/** @format */

topicsRouter = require("express").Router();
const { requestAllTopics } = require("../controllers/topics.controllers");

topicsRouter.get("/", requestAllTopics);

module.exports = topicsRouter;
