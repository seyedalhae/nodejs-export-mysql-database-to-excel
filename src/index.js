const mysql = require("mysql");
const excel = require("exceljs");

// Create a connection to the database
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "test",
});

