/** @format */

usersRouter = require("express").Router();
const { requestUser } = require("../controllers/users.controllers");
const { invalidMethod } = require("../errors/errors");

usersRouter
	.route("/:username")
	.get(requestUser)
	.all(invalidMethod);

module.exports = usersRouter;
