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

articlesRouter.get("/articles_id/comments", requestArticleComments);
articlesRouter.post("/articles_id/comments", uploadArticleComment);

articlesRouter.get("/", requestArticles);

module.exports = articlesRouter;
