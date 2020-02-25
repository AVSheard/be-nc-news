/** @format */

process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

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
		it.only("GET - 200 for a requesting an article by article_id", () => {
			return request(app)
				.get("/api/articles/3")
				.expect(200)
				.then((res) => {
					expect(res.body.user[0]).to.have.all.keys([
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
	});
});
