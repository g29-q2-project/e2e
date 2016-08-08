var tripQueries = require('../database/trips/tripQueries')
var Promise = require('bluebird')

var exportMethods = {
  returnAllTrips: () => {
    return tripQueries.getAllTrips()
  },
  returnTripsAndLocations: () => {
    return tripQueries.getTripsAndLocations()
  },
  returnSingleTrip: (id) => {
    return tripQueries.getTripById(id)
  },
  returnTransitMethod: (id) => {
    return tripQueries.getTripTransitDetails(id)
  },
  tripAddressPicker: (new_origin, existing_origin, new_destination, existing_destination) => {
    return new Promise(function(resolve){
      var tripAddressObj = {};
      if (new_origin.length > 0 && new_destination.length > 0) {
         tripAddressObj.startAdd = new_origin
         tripAddressObj.endAdd = new_destination
         resolve(tripAddressObj)
      } else if (new_origin.length > 0 && existing_destination.length > 0){
        tripAddressObj.startAdd = new_origin
        tripAddressObj.endAdd = existing_destination
        resolve(tripAddressObj)
      } else if (existing_origin.length > 0 && new_destination.length > 0){
        tripAddressObj.startAdd = existing_origin
        tripAddressObj.endAdd = new_destination
        resolve(tripAddressObj)
      } else {
        tripAddressObj.startAdd = existing_origin
        tripAddressObj.endAdd = existing_destination
        resolve(tripAddressObj)
      }
    })
  }
}
Promise.promisify(exportMethods.tripAddressPicker);

module.exports = exportMethods
