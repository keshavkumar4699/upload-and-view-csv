//imports
const express = require("express");
const app = express('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const path = require('path');

//set the port for website
const port = process.env['PORT'];

//setup static files folder
app.use(express.static('./assets'));

//setup express layouts
app.use(expressLayouts);

//put scripts and stles from pages to layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//to encode body in url after getting response
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//setup express router
app.use('/', require('./routes/index_router.js'));

//listen function
app.listen(port, (err) => {
  if(err){
    console.log("******error encountered in listening to port********");
    return;
  }
  console.log("server running at ", port);
});
