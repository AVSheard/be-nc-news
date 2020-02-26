/** @format */

const {
	getArticle,
	patchArticle,
	getArticleComments,
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

const uploadArticleComment = (request, response, next) => {
	postArticleComment(request.params.article_id, request.body)
		.then((insertedComment) => {
			response.status(201).send({ comment: insertedComment[0] });
		})
		.catch((err) => {
			next(err);
		});
};

const requestArticleComments = (request, response, next) => {
	let sort_by;
	let order;
	if (request.query.sort_by) {
		sort_by = request.query.sort_by;
	} else {
		sort_by = "created_at";
	}
	if (request.query.order) {
		order = request.query.order;
	} else {
		order = "desc";
	}
	getArticleComments(request.params.article_id, sort_by, order)
		.then((articleComments) => {
			if (articleComments.length === 0) {
				return Promise.reject({
					status: 404,
					msg: "Article_id does not exist"
				});
			}
			response.status(200).send({ comments: articleComments });
		})
		.catch((err) => {
			next(err);
		});
};

const requestArticles = (request, response, next) => {
	getArticles();
};

module.exports = {
	requestArticle,
	updateArticle,
	requestArticleComments,
	uploadArticleComment,
	requestArticles
};
