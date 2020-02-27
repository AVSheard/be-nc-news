/** @format */

articlesRouter = require("express").Router();
const {
	requestArticle,
	updateArticle,
	requestArticleComments,
	uploadArticleComment,
	requestArticles
} = require("../controllers/articles.controllers");
const { invalidMethod } = require("../errors/errors");

articlesRouter
	.route("/:article_id")
	.get(requestArticle)
	.patch(updateArticle)
	.all(invalidMethod);

articlesRouter
	.route("/:article_id/comments")
	.get(requestArticleComments)
	.post(uploadArticleComment)
	.all(invalidMethod);

articlesRouter
	.route("/")
	.get(requestArticles)
	.all(invalidMethod);

module.exports = articlesRouter;
