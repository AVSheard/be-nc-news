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
		it("GET - 200 for sucessful requestfor list of topics", () => {});
	});
});
