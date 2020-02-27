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
	getArticleComments(
		request.params.article_id,
		request.query.sort_by,
		request.query.order
	)
		.then((articleComments) => {
			response.status(200).send({ comments: articleComments });
		})
		.catch((err) => {
			next(err);
		});
};

const requestArticles = (request, response, next) => {
	const author = request.query.author;
	const topic = request.query.topic;
	let authorReal = true;
	let topicReal = true;
	if (author) authorReal = doesItemExist(author, "username", "users");
	if (topic) topicReal = doesItemExist(topic, "slug", "topics");
	return Promise.all([authorReal, topicReal])
		.then((bools) => {
			if (author && !bools[0]) {
				return Promise.reject({ status: 404, msg: "Author does not exist" });
			} else if (topic && !bools[1]) {
				return Promise.reject({ status: 404, msg: "Topic does not exist" });
			} else {
				return getArticles(
					request.query.sort_by,
					request.query.order,
					author,
					topic
				);
			}
		})
		.then((sortedArticles) => {
			response.status(200).send({ articles: sortedArticles });
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
