/** @format */

usersRouter = require("express").Router();
const { requestUser } = require("../controllers/users.controllers");

usersRouter.get("/:username", requestUser);

module.exports = usersRouter;
