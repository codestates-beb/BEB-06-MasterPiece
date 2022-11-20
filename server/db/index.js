const mysql = require('mysql');
const dotenv = require('dotenv');
const config = require('../config/config');

const con = mysql.createConnection(
	config.development
);

con.connect((err) => {
	if (err) throw err;
	console.log("******* db connected *******");
});

module.exports = con;