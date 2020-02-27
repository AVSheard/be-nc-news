/** @format */

const connection = require("../db/connection");
const { doesItemExist } = require("./middleWare.models");

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

const postArticleComment = (id, commentInfo) => {
	if (!commentInfo.username || !commentInfo.body) {
		return Promise.reject({
			status: 422,
			msg: "Incomplete data for creating comment"
		});
	}
	const insertInfo = {
		...commentInfo,
		article_id: id,
		author: commentInfo.username
	};
	delete insertInfo.username;
	return connection
		.into("comments")
		.insert(insertInfo)
		.returning("*")
		.catch((err) => {
			if (isNaN(Number(id))) {
				return Promise.reject({ status: 400, msg: "Invalid article_id" });
			} else {
				return Promise.reject({
					status: 404,
					msg: "Article_id does not exist"
				});
			}
		});
};

const getArticleComments = (id, sort_by = "created_at", order = "desc") => {
	if (isNaN(Number(id))) {
		return Promise.reject({ status: 400, msg: "Bad Request" });
	}
	return doesItemExist(id, "article_id", "articles").then((bool) => {
		if (!bool) {
			return Promise.reject({ status: 404, msg: "Article_id does not exist" });
		} else {
			return connection
				.select("*")
				.from("comments")
				.where("article_id", id)
				.orderBy(sort_by, order)
				.catch((err) => {
					return Promise.reject({ status: 400, msg: "Bad Request" });
				});
		}
	});
};

const getArticles = (
	sort_by = "created_at",
	order = "desc",
	reqAuthor,
	reqTopic
) => {
	if (order !== "desc" && order !== "asc") {
		return Promise.reject({ status: 400, msg: "Invalid order method" });
	} else if (
		sort_by !== "created_at" &&
		sort_by !== "author" &&
		sort_by !== "title" &&
		sort_by !== "article_id" &&
		sort_by !== "topic" &&
		sort_by !== "votes" &&
		sort_by !== "comment_count"
	) {
		return Promise.reject({ status: 400, msg: "Invalid sort_by method" });
	}

	let authorReal = true;
	let topicReal = true;
	if (reqAuthor) authorReal = doesItemExist(reqAuthor, "username", "users");
	if (reqTopic) topicReal = doesItemExist(reqTopic, "slug", "topics");
	return Promise.all([authorReal, topicReal])
		.then((bools) => {
			if (reqAuthor && !bools[0]) {
				return Promise.reject({ status: 404, msg: "Author does not exist" });
			} else if (reqTopic && !bools[1]) {
				return Promise.reject({ status: 404, msg: "Topic does not exist" });
			}

			return connection
				.select("articles.*")
				.from("articles")
				.orderBy(sort_by, order)
				.leftJoin("comments", "articles.article_id", "=", "comments.article_id")
				.groupBy("articles.article_id")
				.count({ comment_count: "comments.article_id" })
				.modify((query1) => {
					if (reqAuthor) {
						query1.where("articles.author", reqAuthor);
					}
					if (reqTopic) {
						query1.where("articles.topic", reqTopic);
					}
				});
		})
		.then((articles) => {
			articles.forEach((article) => {
				delete article.body;
			});
			return articles;
		});
};

module.exports = {
	getArticle,
	patchArticle,
	getArticleComments,
	postArticleComment,
	getArticles
};
