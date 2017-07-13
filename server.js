/* jshint esversion: 6 */
/* jshint node: true */

'use strict';

let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = process.env.PORT || 3000;
let config = require('config'); //we load the db location from the JSON files

let  Task = require('./src/models/placeModel');

  // update header to allow access 
  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
});  

mongoose.Promise = global.Promise;

//db options
let options = { 
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
              }; 

//mongod --dbpath=C:\Ravi\MongoDB\data
//mongoose.connect('mongodb://localhost/Placesdb'); 
//db connection      
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}


// for parsing parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./src/routes/placeRouter');
routes(app);

app.listen(port);

console.log('My RESTful API server started on: ' + port + ' -> Press Ctrl+C to stop Server...');

module.exports = app;