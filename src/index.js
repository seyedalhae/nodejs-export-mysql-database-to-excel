const mysql = require("mysql");
const excel = require("exceljs");
const { dbConfig, dbColumns, excelDetail } = require("./config");

// Create a connection to the database
const db = mysql.createConnection(dbConfig);

// Open the MySQL connection
db.connect((err) => {
	if (err) throw err;

	// Query data from MySQL
	db.query(`SELECT * FROM ${dbConfig.table}`, (err, users, fields) => {
		const jsonUsers = JSON.parse(JSON.stringify(users));
		console.log(jsonUsers);

		// Creating workbook
		let workbook = new excel.Workbook();
		// Creating worksheet
		let worksheet = workbook.addWorksheet(excelDetail.sheetName);

		worksheet.columns = [...dbColumns];

		// Add rows to the Excel file
		worksheet.addRows(jsonUsers);

		// Output from Excel file
		workbook.xlsx
			.writeFile(`${__dirname}/upload/${excelDetail.fileName}.xlsx`)
			.then(() => console.log("File saved!"));

		// Close MySQL connection
		db.end((err) => {
			if (err) {
				return console.log("error:" + err.message);
			}
			console.log("Close the database connection.");
		});
	});
});
