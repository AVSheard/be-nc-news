/** @format */

process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require("../app");
const {
	doesItemExist,
	doesColumnExist
} = require("../models/middleWare.models");
const connection = require("../db/connection");
chai.use(require("sams-chai-sorted"));

describe("/api", () => {
	beforeEach(() => connection.seed.run());
	after(() => connection.destroy());

	describe("/topics", () => {
		it("GET - 200 for sucessful request for list of topics", () => {
			return request(app)
				.get("/api/topics")
				.expect(200)
				.then((res) => {
					res.body.topics.forEach((topic) => {
						expect(topic).to.have.all.keys(["description", "slug"]);
					});
				});
		});
	});

	describe("/user", () => {
		it("GET - 200 for sucessful request for a user by username", () => {
			return request(app)
				.get("/api/users/butter_bridge")
				.expect(200)
				.then((res) => {
					expect(res.body.user[0]).to.have.all.keys([
						"username",
						"avatar_url",
						"name"
					]);
				});
		});
		it("GET - 404 for requesting a user with a username that dose not exist", () => {
			return request(app)
				.get("/api/users/NOT-A-USERNAME")
				.expect(404)
				.then((res) => {
					expect(res.body.msg).to.equal("Username does not exist");
				});
		});
	});

	describe("/articles", () => {
		it("GET - 200 for requesting an article by article_id", () => {
			return request(app)
				.get("/api/articles/1")
				.expect(200)
				.then((res) => {
					expect(res.body.user).to.have.all.keys([
						"author",
						"title",
						"article_id",
						"body",
						"topic",
						"created_at",
						"votes",
						"comment_count"
					]);
				});
		});
		it("GET - 404 for requesting an article with an article_id that does not exist", () => {
			return request(app)
				.get("/api/articles/9999")
				.expect(404)
				.then((res) => {
					expect(res.body.msg).to.equal("Article_id does not exist");
				});
		});
		it("GET - 400 for requesting an article with an invalid article_id", () => {
			return request(app)
				.get("/api/articles/INVALID-ARTICLE_ID")
				.expect(400)
				.then((res) => {
					expect(res.body.msg).to.equal("Invalid article_id");
				});
		});
		it("PATCH - 201 for a request that the votes are changed on an article", () => {
			let vote = { inc_votes: 200 };
			return request(app)
				.patch("/api/articles/1")
				.expect(201)
				.send(vote)
				.then((res) => {
					expect(res.body.article).to.have.all.keys([
						"author",
						"title",
						"article_id",
						"body",
						"topic",
						"created_at",
						"votes",
						"comment_count"
					]);
					expect(res.body.article.votes).to.equal(300);
				});
		});
		it("PATCH - 404 for an article_id that does not exist", () => {
			let vote = { inc_votes: 200 };
			return request(app)
				.patch("/api/articles/9999")
				.send(vote)
				.expect(404)
				.then((res) => {
					expect(res.body.msg).to.equal("Article_id does not exist");
				});
		});
		it("PATCH - 400 for an invalid article_id", () => {
			let vote = { inc_votes: 200 };
			return request(app)
				.patch("/api/articles/INVALID-ARTICLE_ID")
				.send(vote)
				.expect(400)
				.then((res) => {
					expect(res.body.msg).to.equal("Invalid article_id");
				});
		});
		it("PATCH - 422 for missing inc_votes data", () => {
			return request(app)
				.patch("/api/articles/2")
				.expect(422)
				.then((res) => {
					expect(res.body.msg).to.equal("No data for changing votes given");
				});
		});
		it("PATCH - 422 for invalid inc_votes data", () => {
			let vote = { inc_votes: "Invalid_ENTRY" };
			return request(app)
				.patch("/api/articles/2")
				.send(vote)
				.expect(422)
				.then((res) => {
					expect(res.body.msg).to.equal("No data for changing votes given");
				});
		});
		it("POST - 201 for a request to add a new comment", () => {
			let commentInfo = {
				username: "butter_bridge",
				body: "I wanted to say something"
			};
			return request(app)
				.post("/api/articles/1/comments")
				.send(commentInfo)
				.expect(201)
				.then((res) => {
					expect(res.body.comment).to.have.all.keys([
						"author",
						"comment_id",
						"body",
						"created_at",
						"votes",
						"article_id"
					]);
					expect(res.body.comment.author).to.equal("butter_bridge");
					expect(res.body.comment.body).to.equal("I wanted to say something");
				});
		});
		it("POST - 404 for an article_id that does not exist", () => {
			let commentInfo = {
				username: "butter_bridge",
				body: "I wanted to say something"
			};
			return request(app)
				.post("/api/articles/9999/comments")
				.send(commentInfo)
				.expect(404)
				.then((res) => {
					expect(res.body.msg).to.equal("Article_id does not exist");
				});
		});
		it("POST - 400 for an invalid article_id", () => {
			let commentInfo = {
				username: "butter_bridge",
				body: "I wanted to say something"
			};
			return request(app)
				.post("/api/articles/INVALID-ARTICLE_ID/comments")
				.send(commentInfo)
				.expect(400)
				.then((res) => {
					expect(res.body.msg).to.equal("Invalid article_id");
				});
		});
		it("POST - 422 when body is missing from request body", () => {
			let commentInfo = {
				body: "I wanted to say something"
			};
			return request(app)
				.post("/api/articles/2/comments")
				.send(commentInfo)
				.expect(422)
				.then((res) => {
					expect(res.body.msg).to.equal("Incomplete data for creating comment");
				});
		});
		it("POST - 422 when username is missing from request body", () => {
			let commentInfo = {
				username: "butter_bridge"
			};
			return request(app)
				.post("/api/articles/2/comments")
				.send(commentInfo)
				.expect(422)
				.then((res) => {
					expect(res.body.msg).to.equal("Incomplete data for creating comment");
				});
		});
		it("POST - 422 when request body is missing", () => {
			return request(app)
				.post("/api/articles/2/comments")
				.expect(422)
				.then((res) => {
					expect(res.body.msg).to.equal("Incomplete data for creating comment");
				});
		});
		it("GET - 200 when returning the comments from an article", () => {
			return request(app)
				.get("/api/articles/1/comments")
				.expect(200)
				.then((res) => {
					res.body.comments.forEach((comment) => {
						expect(comment).to.have.all.keys([
							"author",
							"comment_id",
							"body",
							"created_at",
							"votes",
							"article_id"
						]);
					});
				});
		});
		it("GET - 200 can return comments in descending created_at order by default", () => {
			return request(app)
				.get("/api/articles/1/comments")
				.expect(200)
				.then((res) => {
					expect(res.body.comments).to.be.sortedBy("created_at", {
						descending: true
					});
				});
		});
		it("GET - 200 can return comments in author order", () => {
			return request(app)
				.get("/api/articles/1/comments/?sort_by=author")
				.expect(200)
				.then((res) => {
					expect(res.body.comments).to.be.sortedBy("author", {
						descending: true
					});
				});
		});
		it("GET - 200 can return comments in acending order", () => {
			return request(app)
				.get("/api/articles/1/comments/?order=asc")
				.expect(200)
				.then((res) => {
					expect(res.body.comments).to.be.sortedBy("created_at");
				});
		});
		it("GET - 200 can return comments in acending order by author", () => {
			return request(app)
				.get("/api/articles/1/comments/?sort_by=author&order=asc")
				.expect(200)
				.then((res) => {
					expect(res.body.comments).to.be.sortedBy("author");
				});
		});
		it("GET - 404 for an article_id that does not exist", () => {
			return request(app)
				.get("/api/articles/9999/comments")
				.expect(404)
				.then((res) => {
					expect(res.body.msg).to.equal("Article_id does not exist");
				});
		});
		it("GET - 400 for an invalid article_id", () => {
			return request(app)
				.get("/api/articles/INVALID-ARTICLE_ID/comments")
				.expect(400)
				.then((res) => {
					expect(res.body.msg).to.equal("Bad Request");
				});
		});
		it("GET - 404 for a sort_by query that does not exist", () => {
			return request(app)
				.get("/api/articles/3/comments/?sort_by=NOT_A_COLUMN")
				.expect(400)
				.then((res) => {
					expect(res.body.msg).to.equal("Bad Request");
				});
		});
		it("GET - 200 when returning the articles", () => {
			return request(app)
				.get("/api/articles")
				.expect(200)
				.then((res) => {
					res.body.articles.forEach((comment) => {
						expect(comment).to.have.all.keys([
							"author",
							"title",
							"topic",
							"created_at",
							"votes",
							"article_id",
							"comment_count"
						]);
					});
				});
		});
		it("GET - 200 returns articles in descending order by date as default", () => {
			return request(app)
				.get("/api/articles")
				.expect(200)
				.then((res) => {
					expect(res.body.articles).to.be.sortedBy("created_at", {
						descending: true
					});
				});
		});
		it("GET - 200 returns articles in ascending order by author", () => {
			return request(app)
				.get("/api/articles/?sort_by=author&order=asc")
				.expect(200)
				.then((res) => {
					expect(res.body.articles).to.be.sortedBy("author");
				});
		});
		it("GET - 200 returns articles and filters by author", () => {
			return request(app)
				.get("/api/articles/?author=butter_bridge")
				.expect(200)
				.then((res) => {
					res.body.articles.forEach((article) => {
						expect(article.author).to.equal("butter_bridge");
					});
				});
		});
		it("GET - 200 returns articles and filters by topic", () => {
			return request(app)
				.get("/api/articles/?topic=mitch")
				.expect(200)
				.then((res) => {
					res.body.articles.forEach((article) => {
						expect(article.topic).to.equal("mitch");
					});
				});
		});
		it("GET - 200 returns articles and filters by topic and author", () => {
			return request(app)
				.get("/api/articles/?topic=mitch&author=butter_bridge")
				.expect(200)
				.then((res) => {
					res.body.articles.forEach((article) => {
						expect(article.topic).to.equal("mitch");
						expect(article.author).to.equal("butter_bridge");
					});
				});
		});
		it("GET - 404 for an invalid author query", () => {
			return request(app)
				.get("/api/articles?author=NOT_AN_AUTHOR")
				.expect(404)
				.then((res) => {
					expect(res.body.msg).to.equal("Author does not exist");
				});
		});
		it("GET - 404 for an invalid topic query", () => {
			return request(app)
				.get("/api/articles?topic=NOT_A_TOPIC")
				.expect(404)
				.then((res) => {
					expect(res.body.msg).to.equal("Topic does not exist");
				});
		});
		it("GET - 400 for requesting an order that does not exist", () => {
			return request(app)
				.get("/api/articles?order=NOT_AN_ORDER")
				.expect(400)
				.then((res) => {
					expect(res.body.msg).to.equal("Invalid order method");
				});
		});
		it("GET - 400 for requesting a sort_by that does not exist", () => {
			return request(app)
				.get("/api/articles?sort_by=NOT_A_COLUMN")
				.expect(400)
				.then((res) => {
					expect(res.body.msg).to.equal("Invalid sort_by method");
				});
		});
		describe("/comments", () => {
			it("PATCH - 201 when changed the vote on a comment", () => {
				const vote = { inc_votes: 1 };
				return request(app)
					.patch("/api/comments/1")
					.send(vote)
					.expect(201)
					.then((res) => {
						expect(res.body.comment).to.have.all.keys([
							"author",
							"created_at",
							"votes",
							"article_id",
							"body",
							"comment_id"
						]);
						expect(res.body.comment.votes).to.equal(17);
					});
			});
			it("PATCH - 201 when changed the vote on a comment negativley", () => {
				const vote = { inc_votes: -3 };
				return request(app)
					.patch("/api/comments/1")
					.send(vote)
					.expect(201)
					.then((res) => {
						expect(res.body.comment).to.have.all.keys([
							"author",
							"created_at",
							"votes",
							"article_id",
							"body",
							"comment_id"
						]);
						expect(res.body.comment.votes).to.equal(13);
					});
			});
			it("PATCH - 404 for an comment_id that does not exist", () => {
				let vote = { inc_votes: 200 };
				return request(app)
					.patch("/api/comments/9999")
					.send(vote)
					.expect(404)
					.then((res) => {
						expect(res.body.msg).to.equal("Comment_id does not exist");
					});
			});
			it("PATCH - 400 for an invalid article_id", () => {
				let vote = { inc_votes: 200 };
				return request(app)
					.patch("/api/comments/INVALID-ARTICLE_ID")
					.send(vote)
					.expect(400)
					.then((res) => {
						expect(res.body.msg).to.equal("Invalid comment_id");
					});
			});
			it("PATCH - 422 for missing inc_votes data", () => {
				return request(app)
					.patch("/api/comments/2")
					.expect(422)
					.then((res) => {
						expect(res.body.msg).to.equal(
							"No data for changing votes has been given"
						);
					});
			});
			it("PATCH - 422 for invalid inc_votes data", () => {
				let vote = { inc_votes: "Invalid_ENTRY" };
				return request(app)
					.patch("/api/comments/2")
					.send(vote)
					.expect(422)
					.then((res) => {
						expect(res.body.msg).to.equal(
							"Invalid data for changing votes given"
						);
					});
			});
			it("DELETE - 204 when successfuly deleted a comment", () => {
				return request(app)
					.delete("/api/comments/1")
					.expect(204);
			});
			it("DELETE - 404 for an comment_id that does not exist", () => {
				return request(app)
					.delete("/api/comments/9999")
					.expect(404)
					.then((res) => {
						expect(res.body.msg).to.equal("Comment_id does not exist");
					});
			});
			it("DELETE - 400 for an invalid article_id", () => {
				return request(app)
					.delete("/api/comments/INVALID-ARTICLE_ID")
					.expect(400)
					.then((res) => {
						expect(res.body.msg).to.equal("Invalid comment_id");
					});
			});
		});
	});
});

describe("middleWare", () => {
	beforeEach(() => connection.seed.run());
	after(() => connection.destroy());

	// describe("doesItemExist", () => {
	// 	it("returns a boolean when passed three srings", () => {
	// 		return doesItemExist("paper", "slug", "topics").then((actual) => {
	// 			expect(typeof actual).to.equal("boolean");
	// 		});
	// 	});
	// 	it("returns true when the item exists", () => {
	// 		return doesItemExist("paper", "slug", "topics").then((actual) => {
	// 			expect(actual).to.equal(true);
	// 		});
	// 	});
	// 	it("returns false when the item does not exists", () => {
	// 		return doesItemExist("NOT-AN-ITEM", "slug", "topics").then((actual) => {
	// 			expect(actual).to.equal(false);
	// 		});
	// 	});
	// });

	// describe("doesColumnExist", () => {
	// 	it("returns a boolean when passed two strings", () => {
	// 		return doesColumnExist("slug", "topics").then((actual) => {
	// 			expect(typeof actual).to.equal("boolean");
	// 		});
	// 	});
	// 	it("returns true when the column exists", () => {
	// 		return doesColumnExist("slug", "topics").then((actual) => {
	// 			expect(actual).to.equal(true);
	// 		});
	// 	});
	// 	it("returns false when the column does not exists", () => {
	// 		return doesItemExist("NOT-AN-COLUMN", "topics").then((actual) => {
	// 			expect(actual).to.equal(false);
	// 		});
	// 	});
	// });
});

describe.only("invalid methods", () => {
	it("405 for invalid methods on api/users/:username", () => {
		const invalidMethods = ["patch", "put", "delete", "post"];
		const methodPromises = invalidMethods.map((method) => {
			return request(app)
				[method]("/api/users/butter_bridge")
				.expect(405)
				.then(({ body: { msg } }) => {
					expect(msg).to.equal("method not allowed");
				});
		});
		return Promise.all(methodPromises);
	});
	it("405 for invalid methods on api/topics", () => {
		const invalidMethods = ["patch", "put", "delete", "post"];
		const methodPromises = invalidMethods.map((method) => {
			return request(app)
				[method]("/api/topics")
				.expect(405)
				.then(({ body: { msg } }) => {
					expect(msg).to.equal("method not allowed");
				});
		});
		return Promise.all(methodPromises);
	});
	it("405 for invalid methods on api/articles/:id", () => {
		const invalidMethods = ["put", "delete", "post"];
		const methodPromises = invalidMethods.map((method) => {
			return request(app)
				[method]("/api/articles/1")
				.expect(405)
				.then(({ body: { msg } }) => {
					expect(msg).to.equal("method not allowed");
				});
		});
		return Promise.all(methodPromises);
	});
	it("405 for invalid methods on api/articles/:id/comments", () => {
		const invalidMethods = ["put", "delete", "patch"];
		const methodPromises = invalidMethods.map((method) => {
			return request(app)
				[method]("/api/articles/1/comments")
				.expect(405)
				.then(({ body: { msg } }) => {
					expect(msg).to.equal("method not allowed");
				});
		});
		return Promise.all(methodPromises);
	});
	it("405 for invalid methods on api/articles", () => {
		const invalidMethods = ["put", "delete", "patch", "post"];
		const methodPromises = invalidMethods.map((method) => {
			return request(app)
				[method]("/api/articles")
				.expect(405)
				.then(({ body: { msg } }) => {
					expect(msg).to.equal("method not allowed");
				});
		});
		return Promise.all(methodPromises);
	});
	it("405 for invalid methods on api/comments/:comment_id", () => {
		const invalidMethods = ["put", "post", "get"];
		const methodPromises = invalidMethods.map((method) => {
			return request(app)
				[method]("/api/comments/1")
				.expect(405)
				.then(({ body: { msg } }) => {
					expect(msg).to.equal("method not allowed");
				});
		});
		return Promise.all(methodPromises);
	});
});
