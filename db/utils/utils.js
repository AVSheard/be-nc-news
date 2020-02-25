/** @format */

exports.formatDates = (list) => {
	return list.map((article) => {
		let newDate = new Date(article.created_at);
		newDate = newDate.toUTCString();
		return { ...article, created_at: newDate };
	});
};

exports.makeRefObj = (list) => {
	return list.reduce((refObj, article) => {
		refObj[article.title] = article.article_id;
		return refObj;
	}, {});
};

exports.formatComments = (comments, articleRef) => {};
