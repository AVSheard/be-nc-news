/** @format */

const { getArticle } = require("../models/articles.models");

const requestArticle = (request, response, next) => {
	console.log(request);
	getArticle(request.params.article_id);
};

module.exports = { requestArticle };
