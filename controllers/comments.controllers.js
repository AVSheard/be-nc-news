/** @format */

const { patchComment, deleteComment } = require("../models/comments.models");

const updateComment = (request, response, next) => {
	patchComment(request.params.comment_id, request.body.inc_votes)
		.then((patchedComment) => {
			response.status(201).send({ comment: patchedComment[0] });
		})
		.catch((err) => {
			next(err);
		});
};

const removeComment = (request, response, next) => {
	deleteComment(request.params.comment_id)
		.then(() => {
			response.status(204).send();
		})
		.catch((err) => {
			next(err);
		});
};

module.exports = { updateComment, removeComment };
