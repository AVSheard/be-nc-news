/** @format */
const topicsRouter = require("./topics.router");
apiRouter = require("express").Router();

apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
