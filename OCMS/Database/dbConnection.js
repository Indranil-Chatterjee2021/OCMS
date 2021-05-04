var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ocms"
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected to OCMS Database..!");
  
}); 
module.exports = conn;



