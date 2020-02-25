/** @format */

commentsRouter = require("express").Router();

commentsRouter.patch("/:comment_id");
commentsRouter.delete("/:comment_id");

module.exports = commentsRouter;
