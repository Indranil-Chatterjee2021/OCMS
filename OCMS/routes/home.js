var express = require("express");
//const { check, validationResult } = require('express-validator');
var sql = require("mssql");
//var dbConfig = require('../Database/dbConnection');
var mysql= require('mysql');
var path = require("path");
var con=mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "indra",
      database: "hospital"
});

con.connect(function(err){
  if(err) throw err;
  console.log('database connected successfully');
  });

var router = express.Router();
//router.use(express.static(path.join(__dirname, "StaticFiles")));
router.use(express.static(path.join(__dirname, "public")));
router.get("/", (req,res) => {
    res
    .status(200)
    //.sendFile(path.join(__dirname, "Home.html"));
   //.render(path.join(__dirname, 'home'));
   .render('home');
 });
 router.post('/Login',function(req, res, next) {
  var pswd= req.body.password;
  var email= req.body.email;
  var getQuery="select * from `user` where `email`='" + email + "'and `password`='" + pswd + "'";
  con.query(getQuery,function(err,result){
 
     if(err) throw err;
 console.log(getQuery);
     res.render('register');
  
  });
 
 });
 

 module.exports = router;