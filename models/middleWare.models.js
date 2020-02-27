/** @format */

const connection = require("../db/connection");

const doesItemExist = (item, column, table) => {
	return connection
		.select("*")
		.from(table)
		.where(column, item)
		.then((array) => {
			if (array.length === 0) return false;
			return true;
		});
};

const doesColumnExist = (column, table) => {
	return connection
		.select("*")
		.from(table)
		.where(column)
		.then(() => {
			return true;
		})
		.catch((err) => {
			return false;
		});
};

module.exports = { doesItemExist, doesColumnExist };
