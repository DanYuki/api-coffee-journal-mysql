const mysql = require('mysql');

let db = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name
})

db.connect((error) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Connected to database');
    }
})

module.exports = db 