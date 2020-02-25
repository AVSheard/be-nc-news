/** @format */

articlesRouter = require("express").Router();
const { requestArticle } = require("../controllers/articles.controllers");

articlesRouter.get("/:article_id", requestArticle);

module.exports = articlesRouter;
