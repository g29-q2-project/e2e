var db = require('../../../config/db')

module.exports = {
  createTrip: (trip) => {
    return db.knex('trip_directions').insert(trip).returning('*')
  },
  getAllTrips: () => {
    return db.knex('user_trips')
  },
  getTripById: (id) => {
    return db.knex('user_trips').where('id', id)
  },
  getTripTransitMethod: (id) => {
    return db.knex('transit_methods').select('transit_type').where('id', id)
  }
}
