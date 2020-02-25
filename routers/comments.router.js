/** @format */

commentsRouter = require("express").Router();
const {
	updateComment,
	removeComment
} = require("../controllers/comments.controllers");

commentsRouter.patch("/:comment_id", updateComment);
commentsRouter.delete("/:comment_id", removeComment);

module.exports = commentsRouter;
