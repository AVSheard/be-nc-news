/** @format */

const connection = require("../db/connection");

const patchComment = (id, votesChange) => {
	return connection
		.select("votes")
		.from("comments")
		.where("comment_id", id)
		.then((originVotes) => {
			return connection("comments")
				.where("comment_id", id)
				.update({ votes: votesChange + originVotes[0].votes }, "votes");
		})
		.then(() => {
			return connection
				.select("*")
				.from("comments")
				.where("comment_id", id);
		});
};

const deleteComment = (id) => {
	return connection("comments")
		.where("comment_id", id)
		.del();
};

module.exports = { patchComment, deleteComment };
