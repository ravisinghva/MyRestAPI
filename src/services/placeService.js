/* jshint esversion: 6 */
/* jshint node: true */

'use strict';

var apiModel = require('../models/placeModel.js');
var mongoose = require('mongoose'),
  Places = mongoose.model('Places');

Places.find({}, function(err, places) {
    if (err || places.length == 0)
      populateData();
});

// Add some mock data to test get in case nothing was saved
function populateData(){
    var new_place = new Places({
            latitude: 38.924037, 
            longitude: -77.543919, 
            address: "123 main Street, Chantilly VA 20152",
            desc: "This is my Home",
            name: "Home1" 
        });
    new_place.save(function(err, place) {
      if (err)
        console.log(err);
    });  
    new_place = new Places({
            latitude: 38.924037, 
            longitude: -77.543919, 
            address: "123 main Street, Chantilly VA 20152",
            desc: "This is my Home",
            name: "Home2" 
    });
    new_place.save(function(err, place) {
      if (err)
        console.log(err);
  });
  new_place = new Places({
            latitude: 38.924037, 
            longitude: -77.543919, 
            address: "123 main Street, Chantilly VA 20152",
            desc: "This is my Home",
            name: "Home3" 
        });
    new_place.save(function(err, place) {
    if (err)
      console.log(err);
  });
}

// Get All Places
exports.home = function(req, res) {
    // show welcome message
    res.json({message: "Welcome to REST API!"});     
};

// Get All Places
exports.get_all_places = function(req, res) {
  //
  Places.find({}, function(err, places) {
    if (err)
      res.send(err);
    res.json(places);
  });
};

// Add Place Record
exports.add_a_place = function(req, res) {
  console.log(req.body);
  var new_place = new Places(req.body);
  
  new_place.save(function(err, place) {
    if (err)
      res.send(err);
    res.json(place);
  });
};

// get place by ID
exports.get_a_place = function(req, res) {
  Places.findById(req.params.placeId, function(err, place) {
    if (err)
      res.send(err);
    res.json(place);
  });
};

// get place by name
exports.get_a_place_by_name = function(req, res) {
  Places.find({'name' : req.params.placeId}, function(err, place) {
    if (err)
      res.send(err);
    res.json(place);
  });
};

// update a place
exports.update_a_place = function(req, res) {
  //console.log("Hello");
  Places.findOneAndUpdate(req.params.placeId, req.body, {new: true}, function(err, place) {
    if (err)
      res.send(err);
    res.json(req.params.placeId);
  });
};

// Delete a Place
exports.delete_a_place = function(req, res) {
  Places.remove({
    _id: req.params.placeId
  }, function(err, place) {
    if (err)
      res.send(err);
    res.json({ message: 'Place successfully deleted' });
  });
};
