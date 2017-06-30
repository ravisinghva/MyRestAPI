'use strict';
module.exports = function(app) {
  var myAPIController = require('../controllers/myAPIController');
  // myAPI Routes parameter 
  app.route('/places')
    .get(myAPIController.get_all_places)
    .post(myAPIController.add_a_place);


  app.route('/places/:placeId')
    .get(myAPIController.get_a_place_by_name)
    .put(myAPIController.update_a_place)
    .delete(myAPIController.delete_a_place);
};
