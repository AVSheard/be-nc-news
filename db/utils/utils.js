/** @format */

const formatDates = (list) => {
	return list.map((article) => {
		let newDate = new Date(article.created_at);
		newDate = newDate.toUTCString();
		return { ...article, created_at: newDate };
	});
};

const makeRefObj = (list) => {
	return list.reduce((refObj, article) => {
		refObj[article.title] = article.article_id;
		return refObj;
	}, {});
};

const formatComments = (comments, articleRef) => {
	const formattedDates = formatDates(comments);
	return formattedDates.map((comment) => {
		comment.author = comment.created_by;
		delete comment.created_by;
		comment.article_id = articleRef[comment.belongs_to];
		delete comment.belongs_to;
		return comment;
	});
};

module.exports = { formatDates, makeRefObj, formatComments };
