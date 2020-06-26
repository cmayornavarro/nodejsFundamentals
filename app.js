const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = mongoose.connect('mongodb://localhost/bookAPI');
const app = express();

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);// ( ) execute


// set json in req.body 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api',bookRouter); // for /api/books

app.get("/", (req, res) => {
	res.send("Welcome to my API");
});

app.listen(port, () => {
	console.log("running " + port);
});