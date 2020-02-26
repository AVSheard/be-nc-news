/** @format */

const connection = require("../db/connection");

const getArticle = (id) => {
	id = Number(id);
	if (isNaN(id)) {
		return Promise.reject({
			status: 400,
			msg: "Invalid article_id"
		});
	}
	return connection
		.select("articles.*")
		.from("articles")
		.leftJoin("comments", "articles.article_id", "=", "comments.article_id")
		.groupBy("articles.article_id")
		.count({ comment_count: "comments.article_id" })
		.where("articles.article_id", id)
		.then((article) => {
			if (article.length === 0) {
				return Promise.reject({
					status: 404,
					msg: "Article_id does not exist"
				});
			} else return article[0];
		});
};

const patchArticle = (id, voteChange) => {
	id = Number(id);
	if (isNaN(id)) {
		return Promise.reject({
			status: 400,
			msg: "Invalid article_id"
		});
	} else if (typeof voteChange !== "number") {
		return Promise.reject({
			status: 422,
			msg: "No data for changing votes given"
		});
	}
	return connection
		.select("votes")
		.from("articles")
		.where("article_id", id)
		.then((originVotes) => {
			if (originVotes.length === 0) {
				return Promise.reject({
					status: 404,
					msg: "Article_id does not exist"
				});
			}
			return connection("articles")
				.where("article_id", "=", id)
				.update({ votes: voteChange + originVotes[0].votes }, "votes");
		})
		.then(() => {
			return getArticle(id);
		});
};

const getArticleComments = () => {};

const postArticleComment = () => {};

const getArticles = () => {};

module.exports = {
	getArticle,
	patchArticle,
	getArticleComments,
	postArticleComment,
	getArticles
};
