/** @format */
const topicsRouter = require("./topics.router");
const usersRouter = require("./users.router");
const articlesRouter = require("./articles.router");
const commentsRouter = require("./comments.router");
apiRouter = require("express").Router();
const { invalidMethod } = require("../errors/errors");
const { requestJSON } = require("../controllers/api.controllers");

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentsRouter);

apiRouter
	.route("/")
	.get(requestJSON)
	.all(invalidMethod);

module.exports = apiRouter;
