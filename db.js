const mysql      = require('mysql');

const connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
});

exports.connect = () => {
    return new Promise((resolve, reject) => {
        connection.connect((error) => {
            if (error) {
                reject(error);
            }
            resolve(true);
        });
    });
}

exports.query = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    })
}