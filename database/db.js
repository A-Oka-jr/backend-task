const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "app",
});

connection.connect((err) => {
    if (err) console.log(err);
    else console.log("MySQL is connected...");
});

module.exports = connection;
