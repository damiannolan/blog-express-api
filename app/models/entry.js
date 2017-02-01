// A model for entries 

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var entrySchema = new Schema({
	title: String,
	body: String,
	time: String
});

module.exports = mongoose.model('Entry', entrySchema);