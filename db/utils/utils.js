/** @format */

exports.formatDates = (list) => {
	return list.map((article) => {
		let newDate = new Date(article.created_at);
		newDate = newDate.toUTCString();
		return { ...article, created_at: newDate };
	});
};

exports.makeRefObj = (list) => {};

exports.formatComments = (comments, articleRef) => {};
