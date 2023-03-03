const mysql = require("mysql");
const excel = require("exceljs");

// Create a connection to the database
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "test",
});

db.connect((err) => {
	if (err) throw err;

	db.query("SELECT * FROM users", function (err, users, fields) {
		const jsonUsers = JSON.parse(JSON.stringify(users));
		console.log(jsonUsers);

		let workbook = new excel.Workbook();
		let worksheet = workbook.addWorksheet("users");

		worksheet.columns = [
			{ header: "Id", key: "id", width: 10 },
			{ header: "Name", key: "name", width: 30 },
			{ header: "Price", key: "price", width: 30 },
		];

		worksheet.addRows(jsonUsers);

		workbook.xlsx
			.writeFile("users.xlsx")
			.then(() => console.log("file saved!"));

		db.end((err) => {
			if (err) {
				return console.log("error:" + err.message);
			}
			console.log("Close the database connection.");
		});
	});
});
