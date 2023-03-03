const mysql = require("mysql");
const excel = require("exceljs");

// Create a connection to the database
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "test",
});

// Open the MySQL connection
db.connect((err) => {
	if (err) throw err;

	// Query data from MySQL
	db.query("SELECT * FROM users", (err, users, fields) => {
		const jsonUsers = JSON.parse(JSON.stringify(users));
		console.log(jsonUsers);
		/**
			The database information is like the following array
			[
				{ id: 1, name: 'Ali', age: 21, city: 'Tehran' },
				{ id: 2, name: 'Reza', age: 22, city: 'Tabriz' },
				{ id: 3, name: 'Diana', age: 23, city: 'Mazandaran' },
				{ id: 4, name: 'Mahdi', age: 24, city: 'Tehran' },
				{ id: 5, name: 'Sara', age: 25, city: 'Alborz' }
			]
		*/

		// Creating workbook
		let workbook = new excel.Workbook();
		// Creating worksheet
		let worksheet = workbook.addWorksheet("users");

		// WorkSheet Header
		worksheet.columns = [
			{ header: "Id", key: "id", width: 10 },
			{ header: "Name", key: "name", width: 30 },
			{ header: "Price", key: "price", width: 30 },
		];

		// Add rows to the Excel file
		worksheet.addRows(jsonUsers);

		// Output from Excel file
		workbook.xlsx
			.writeFile("users.xlsx")
			.then(() => console.log("file saved!"));

		// Close MySQL connection
		db.end((err) => {
			if (err) {
				return console.log("error:" + err.message);
			}
			console.log("Close the database connection.");
		});
	});
});
