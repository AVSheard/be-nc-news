/** @format */

const connection = require("../db/connection");

const getArticle = (id) => {
	console.log(id);
	return connection.select("*").from();
};

const patchArticle = () => {};

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
