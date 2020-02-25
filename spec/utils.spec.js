/** @format */

const { expect } = require("chai");
const {
	formatDates,
	makeRefObj,
	formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
	it("returns [] when passed []", () => {
		const actual = formatDates([]);
		const expected = [];
		expect(actual).to.eql(expected);
	});
	it("returns epoch when passed 0 as created_at", () => {
		const actual = formatDates([
			{
				title: "Running a Node App",
				topic: "coding",
				author: "jessjelly",
				body: "this is the body",
				created_at: 0
			}
		]);
		const expected = [
			{
				title: "Running a Node App",
				topic: "coding",
				author: "jessjelly",
				body: "this is the body",
				created_at: "Thu, 01 Jan 1970 00:00:00 GMT"
			}
		];
		expect(actual).to.eql(expected);
	});
	it("returns correct date for array with one value", () => {
		const actual = formatDates([
			{
				title: "Running a Node App",
				topic: "coding",
				author: "jessjelly",
				body: "this is the body",
				created_at: 1471522072389
			}
		]);
		const expected = [
			{
				title: "Running a Node App",
				topic: "coding",
				author: "jessjelly",
				body: "this is the body",
				created_at: "Thu, 18 Aug 2016 12:07:52 GMT"
			}
		];
		expect(actual).to.eql(expected);
	});
	it("returns correct dates for array with many entries", () => {
		const actual = formatDates([
			{
				title: "Running a Node App",
				topic: "coding",
				author: "jessjelly",
				body: "this is the body",
				created_at: 1471522072389
			},
			{
				title:
					"The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
				topic: "coding",
				author: "jessjelly",
				body: "a body",
				created_at: 1500584273256
			},
			{
				title: "22 Amazing open source React projects",
				topic: "coding",
				author: "happyamy2016",
				body: ".",
				created_at: 1500659650346
			}
		]);
		const expected = [
			{
				title: "Running a Node App",
				topic: "coding",
				author: "jessjelly",
				body: "this is the body",
				created_at: "Thu, 18 Aug 2016 12:07:52 GMT"
			},
			{
				title:
					"The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
				topic: "coding",
				author: "jessjelly",
				body: "a body",
				created_at: "Thu, 20 Jul 2017 20:57:53 GMT"
			},
			{
				title: "22 Amazing open source React projects",
				topic: "coding",
				author: "happyamy2016",
				body: ".",
				created_at: "Fri, 21 Jul 2017 17:54:10 GMT"
			}
		];
		expect(actual).to.eql(expected);
	});
	it("does not mutate the input array", () => {
		const input = [
			{
				title: "Running a Node App",
				topic: "coding",
				author: "jessjelly",
				body: "this is the body",
				created_at: 1471522072389
			},
			{
				title:
					"The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
				topic: "coding",
				author: "jessjelly",
				body: "a body",
				created_at: 1500584273256
			},
			{
				title: "22 Amazing open source React projects",
				topic: "coding",
				author: "happyamy2016",
				body: ".",
				created_at: 1500659650346
			}
		];
		formatDates(input);
		const control = [
			{
				title: "Running a Node App",
				topic: "coding",
				author: "jessjelly",
				body: "this is the body",
				created_at: 1471522072389
			},
			{
				title:
					"The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
				topic: "coding",
				author: "jessjelly",
				body: "a body",
				created_at: 1500584273256
			},
			{
				title: "22 Amazing open source React projects",
				topic: "coding",
				author: "happyamy2016",
				body: ".",
				created_at: 1500659650346
			}
		];
		expect(input).to.eql(control);
	});
});

describe.only("makeRefObj", () => {
	it("returns an empty object when passed an empty array", () => {
		const actual = makeRefObj([]);
		const expected = {};
		expect(actual).to.eql(expected);
	});
	it("returns object of key value pair for array with one entry", () => {
		const actual = makeRefObj([
			{
				article_id: 1,
				title: "Running a Node App",
				body:
					"This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
				votes: 0,
				topic: "coding",
				author: "jessjelly",
				created_at: "2016-08-18T12:07:52.000Z"
			}
		]);
		const expected = { "Running a Node App": 1 };
		expect(actual);
	});
});

describe("formatComments", () => {});
