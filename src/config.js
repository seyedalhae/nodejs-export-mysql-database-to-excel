const config = {
	// Enter your database information instead
	dbConfig: {
		host: "localhost",
		user: "root",
		password: "",
		database: "test",
		table: "users",
	},

	// Enter the names of the database columns as well as Excel as below
	dbColumns: [
		{ header: "Id", key: "id", width: 10 },
		{ header: "Name", key: "name", width: 30 },
		{ header: "Price", key: "price", width: 30 },
	],

	// Write the names you want for Excel
	excelDetail: {
		fileName: "Users",
		sheetName: "users",
	},
};

module.exports = config;
