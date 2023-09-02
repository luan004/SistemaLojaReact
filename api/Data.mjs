import mysql from "mysql2";

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "desafioapice"
});

export default function query(sql, callback) {
    con.query(sql, function(err, result) {
        if (err) throw err;
        callback(result);
    });
}