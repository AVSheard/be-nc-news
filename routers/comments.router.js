/** @format */

commentsRouter = require("express").Router();
const {
	updateComment,
	removeComment
} = require("../controllers/comments.controllers");
const { invalidMethod } = require("../errors/errors");

commentsRouter
	.route("/:comment_id")
	.patch(updateComment)
	.delete(removeComment)
	.all(invalidMethod);

module.exports = commentsRouter;
