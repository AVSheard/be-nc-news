/** @format */

const {
	getArticle,
	patchArticle,
	getArtileComments,
	postArticleComment,
	getArticles
} = require("../models/articles.models");

const requestArticle = (request, response, next) => {
	getArticle(request.params.article_id)
		.then((article) => {
			response.status(200).send({ user: article });
		})
		.catch((err) => {
			next(err);
		});
};

const updateArticle = (request, response, next) => {
	patchArticle(request.params.article_id, request.body.inc_votes)
		.then((updatedArticle) => {
			response.status(201).send({ article: updatedArticle });
		})
		.catch((err) => {
			next(err);
		});
};

const requestArticleComments = (request, response, next) => {};

const uploadArticleComment = (request, response, next) => {};

const requestArticles = (request, response, next) => {};

module.exports = {
	requestArticle,
	updateArticle,
	requestArticleComments,
	uploadArticleComment,
	requestArticles
};
