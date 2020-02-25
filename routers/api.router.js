/** @format */
const topicsRouter = require("./topics.router");
const usersRouter = require("./users.router");
apiRouter = require("express").Router();

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
