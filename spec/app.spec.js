/** @format */

process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require("../app");
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
	});
});
