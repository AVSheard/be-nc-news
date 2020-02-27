/** @format */

commentsRouter = require("express").Router();
const {
	updateComment,
	removeComment
} = require("../controllers/comments.controllers");

commentsRouter
	.route("/:comment_id")
	.patch(updateComment)
	.delete(removeComment);

module.exports = commentsRouter;
