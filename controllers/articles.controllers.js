/** @format */

const {
	getArticle,
	patchArticle,
	getArtileComments,
	postArticleComment,
	getArticles
} = require("../models/articles.models");

const requestArticle = (request, response, next) => {
	console.log(request);
	getArticle(request.params.article_id);
};

const updateArticle = (request, response, next) => {};

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
