/* jshint esversion: 6 */
/* jshint node: true */

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  latitude: {
    type: Number,
    Required: 'Latitude is required field.'
  },
  longitude: {
    type: Number,
    Required: 'Longitude is required field.'
  },
  name: {
    type: String,
    Required: 'Name is required field.'
  },
  address: {
    type: String
  },
  desc: {
    type: String
  }
  /*,
  Created_date: {
    type: Date,
    default: Date.now
  },
  Modified_date: {
    type: Date,
    default: Date.now
  }*/
});

module.exports = mongoose.model('Places', PlaceSchema);