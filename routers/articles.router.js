/** @format */

articlesRouter = require("express").Router();
const {
	requestArticle,
	updateArticle,
	requestArticleComments,
	uploadArticleComment,
	requestArticles
} = require("../controllers/articles.controllers");

articlesRouter
	.route("/:article_id")
	.get(requestArticle)
	.patch(updateArticle);

articlesRouter
	.route("/:article_id/comments")
	.get(requestArticleComments)
	.post(uploadArticleComment);

articlesRouter.route("/").get(requestArticles);

module.exports = articlesRouter;
