var express = require("express");
var sql = require("mssql");
//var dbConfig = require('../Database/dbConnection');
var path = require("path");

var router = express.Router();
router.use(express.static(path.join(__dirname, "public")));
router.get("/user_register", (req,res) => {
    res
    .status(200)
    .render('register')
 });
 
 module.exports = router;