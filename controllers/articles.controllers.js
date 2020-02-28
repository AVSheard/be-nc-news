/** @format */

const {
	getArticle,
	patchArticle,
	getArticleComments,
	postArticleComment,
	getArticles
} = require("../models/articles.models");
const { doesItemExist } = require("../models/middleWare.models");

const requestArticle = (request, response, next) => {
	getArticle(request.params.article_id)
		.then((article) => {
			response.status(200).send({ article });
		})
		.catch((err) => {
			next(err);
		});
};

const updateArticle = (request, response, next) => {
	patchArticle(request.params.article_id, request.body.inc_votes)
		.then((article) => {
			response.status(200).send({ article });
		})
		.catch((err) => {
			next(err);
		});
};

const uploadArticleComment = (request, response, next) => {
	postArticleComment(request.params.article_id, request.body)
		.then((comment) => {
			response.status(201).send({ comment });
		})
		.catch((err) => {
			next(err);
		});
};

const requestArticleComments = (request, response, next) => {
	getArticleComments(
		request.params.article_id,
		request.query.sort_by,
		request.query.order
	)
		.then((comments) => {
			response.status(200).send({ comments });
		})
		.catch((err) => {
			next(err);
		});
};

const requestArticles = (request, response, next) => {
	const author = request.query.author;
	const topic = request.query.topic;
	return getArticles(request.query.sort_by, request.query.order, author, topic)
		.then((articles) => {
			response.status(200).send({ articles });
		})
		.catch((err) => {
			next(err);
		});
};

module.exports = {
	requestArticle,
	updateArticle,
	requestArticleComments,
	uploadArticleComment,
	requestArticles
};
