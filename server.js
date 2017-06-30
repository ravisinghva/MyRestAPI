var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/myAPIModel'),
  bodyParser = require('body-parser');
  // update header to allow access 
  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});  

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Placesdb'); 

// for parsing parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/myAPIRoutes');
routes(app);

app.listen(port);

console.log('My RESTful API server started on: ' + port + ' -> Press Ctrl+C to stop Server...');