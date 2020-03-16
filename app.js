/** @format */

const express = require("express");
const app = express();
const apiRouter = require("./routers/api.router");
const { customErrors } = require("./errors/errors");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(customErrors);

module.exports = app;
