var mysql = require('mysql');

module.exports = con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "desafioapice"
});

module.exports = query = function(sql, callback) {
    con.query(sql, function(err, result) {
        if (err) throw err;
        callback(result);
    });
}