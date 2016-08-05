var schedule = require('node-schedule')
var tripQueries = require('../database/trips/tripQueries')
var gmController = require('../google_maps_api/googleMapsController')
var GoogleMaps = require('../google_maps_api/GoogleMaps')
var Promise = require('bluebird')
var uberEstimateCtrl = require('../uber_api/uberEstimateController')
var Promise = require('bluebird')

 
var updateAllTrips = () => {
  tripQueries.getAllTrips().then((trips) => {
    trips.forEach((trip, key) => {
      GoogleMaps.getDirectionsFromAddresses({
        origin: trip.origin_formatted_address,
        destination: trip.destination_formatted_address,
        mode: trip.trans_mode,
        departure_time: new Date()
      }).then((apiRes) => { 
        console.log("API Response from google maps");
        gmController.parseDirectionsData(apiRes, trip.id, trip.transit_method_id).then((trip_directions) => {
          if(parseInt(trip.transit_method_id) === 303){
            console.log("THIS IS AN UBER TRIP");
            uberEstimateCtrl.putEstimatesForUberTrip(trip, trip_directions)
          }
        })
      })
    })
  })
}
var exportMethods = {
  runAll: () => updateAllTrips(),
  runAllWithSchedule : (cron) => { schedule.scheduleJob(cron, () => updateAllTrips()) }

}
module.exports = exportMethods