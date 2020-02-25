/** @format */

const express = require("express");
const app = express();
const apiRouter = require("./routers/api.router");
const { customErrors } = require("./errors/errors");

app.use(express.json());

app.use("/api", apiRouter);

app.use(customErrors);

module.exports = app;
