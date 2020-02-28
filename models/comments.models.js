/** @format */

const connection = require("../db/connection");
const { doesItemExist } = require("./middleWare.models");

const patchComment = (id, votesChange) => {
	if (isNaN(Number(id))) {
		return Promise.reject({ status: 400, msg: "Invalid comment_id" });
	} else if (votesChange === undefined) {
		votesChange = 0;
	} else if (isNaN(Number(votesChange))) {
		return Promise.reject({
			status: 400,
			msg: "Invalid data for changing votes given"
		});
	}
	return doesItemExist(id, "comment_id", "comments")
		.then((bool) => {
			if (!bool) {
				return Promise.reject({
					status: 404,
					msg: "Comment_id does not exist"
				});
			}
			return connection
				.select("votes")
				.from("comments")
				.where("comment_id", id);
		})
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
	if (isNaN(Number(id))) {
		return Promise.reject({ status: 400, msg: "Invalid comment_id" });
	}
	return doesItemExist(id, "comment_id", "comments").then((bool) => {
		if (!bool) {
			return Promise.reject({
				status: 404,
				msg: "Comment_id does not exist"
			});
		}
		return connection("comments")
			.where("comment_id", id)
			.del();
	});
};

module.exports = { patchComment, deleteComment };
