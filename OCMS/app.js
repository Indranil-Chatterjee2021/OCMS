const express = require("express");
const session = require('express-session');
const path = require('path');
const port = 3000;
//const bodyParser = require('body-parser');
const app = express();
app.use(session({
	secret: 'secret',
	resave: false,
  saveUninitialized: true,
  //cookie: { maxAge: 60000 }
}));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'hbs');

//app.set('views', path.join(__dirname, 'views')); 


app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(process.env.PORT || port , (err) => {
    if(err)
    console.log("Unable to start Server..")
    else
    console.log("Server Started Successfully at Port : " + port)
  })