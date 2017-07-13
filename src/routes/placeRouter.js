/* jshint esversion: 6 */
/* jshint node: true */

'use strict';

module.exports = function(app) {
  var placeService = require('../services/placeService');
  // myAPI Routes parameter 
  app.route("/", placeService.home);

  app.route('/places')
    .get(placeService.get_all_places)
    .post(placeService.add_a_place);


  app.route('/places/:placeId')
    .get(placeService.get_a_place_by_name)
    .put(placeService.update_a_place)
    .delete(placeService.delete_a_place);
};
