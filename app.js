var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");

// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use cors
app.use(cors());

// Set port
var port = process.env.PORT || 8080;

// Configure mongoose - an object modeling tool based on the MongoDB driver
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/entries");

// Model
var Entry = require('./app/models/entry');

// Get an instance of the express Router
var router = express.Router();

// Middleware to use for all requests
// Setup CORS - Cross Origin Resource Sharing
router.use(function(req, res, next) {
    // CORS
    //res.header("Access-Control-Allow-Origin", "*");
 	//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    // Log
    console.log('Request hit');

    // Make sure to go to the next routes and don't stop here
    next(); 
});

// Test route @root to make sure everything is working (accessed at GET http://localhost:8080/api)
// curl http://localhost:8080/api
router.get('/', function(req, res) {
    res.json({ message: 'Welcome'});   
});

router.route('/entries')
	
	//POST
    // Create an entry (accessed at POST http://localhost:8080/api/entries)
    .post(function(req, res) {

        // Create a new instance of the Entry model
        var entry = new Entry();      
        // Set the entry details (comes from the request)
        entry.title = req.body.title;
        entry.body = req.body.body;
        entry.time = req.body.time;

        // Save the entry and check for errors
        entry.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Entry created!' });
        });
        
    })

    //GET
    // Get all the entries (accessed at GET http://localhost:8080/api/entries)
    .get(function(req, res) {
        Entry.find(function(err, entries) {
            if (err)
                res.send(err);

            res.json(entries);
        });
    });

// Register Routes - prefix with /api
app.use('/api', router);

// Start the server listening on port
app.listen(port);
console.log('Server started and listening on port ' + port);