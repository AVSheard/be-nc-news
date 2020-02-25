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
		expect(actual).to.eql(expected);
	});
	it("returns object of key value pairs for array with multiple entrys", () => {
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
			},
			{
				article_id: 2,
				title:
					"The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
				body:
					"Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
				votes: 0,
				topic: "coding",
				author: "jessjelly",
				created_at: "2017-07-20T20:57:53.000Z"
			},
			{
				article_id: 6,
				title: "22 Amazing open source React projects",
				body:
					"This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
				votes: 0,
				topic: "coding",
				author: "happyamy2016",
				created_at: "2017-07-21T17:54:10.000Z"
			}
		]);
		const expected = {
			"Running a Node App": 1,
			"The Rise Of Thinking Machines: How IBM's Watson Takes On The World": 2,
			"22 Amazing open source React projects": 6
		};
		expect(actual).to.eql(expected);
	});
	it("does not mutate the input array", () => {
		const input = [
			{
				article_id: 1,
				title: "Running a Node App",
				body:
					"This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
				votes: 0,
				topic: "coding",
				author: "jessjelly",
				created_at: "2016-08-18T12:07:52.000Z"
			},
			{
				article_id: 2,
				title:
					"The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
				body:
					"Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
				votes: 0,
				topic: "coding",
				author: "jessjelly",
				created_at: "2017-07-20T20:57:53.000Z"
			},
			{
				article_id: 6,
				title: "22 Amazing open source React projects",
				body:
					"This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
				votes: 0,
				topic: "coding",
				author: "happyamy2016",
				created_at: "2017-07-21T17:54:10.000Z"
			}
		];
		makeRefObj(input);
		const control = [
			{
				article_id: 1,
				title: "Running a Node App",
				body:
					"This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
				votes: 0,
				topic: "coding",
				author: "jessjelly",
				created_at: "2016-08-18T12:07:52.000Z"
			},
			{
				article_id: 2,
				title:
					"The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
				body:
					"Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
				votes: 0,
				topic: "coding",
				author: "jessjelly",
				created_at: "2017-07-20T20:57:53.000Z"
			},
			{
				article_id: 6,
				title: "22 Amazing open source React projects",
				body:
					"This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
				votes: 0,
				topic: "coding",
				author: "happyamy2016",
				created_at: "2017-07-21T17:54:10.000Z"
			}
		];
		expect(input).to.eql(control);
	});
});

describe("formatComments", () => {});
