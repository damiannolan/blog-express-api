var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set port
var port = process.env.PORT || 8080;

// Configure mongoose - an object modeling tool based on the MongoDB driver
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/entries");

// Model
var Entry = require('./app/models/entry');

// Get an instance of the express Router
var router = express.Router();