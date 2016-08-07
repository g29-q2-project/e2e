var db = require('../../../config/db')
var ModelBase = require('bookshelf-modelbase')(db.bookshelf);
var bcrypt = require('bcrypt')
module.exports = {
  getUserByUuid : (uuid) => {
    return db.knex('e2e_users').where('uber_uuid', uuid)
  },
  createUser: (user) => {
    return db.knex('e2e_users').insert(user)
  },
  getAllUsers: () => {
    return db.knex('e2e_users')
  },
  additionalLoginInfo: (uuid, newUserInfo) => {
    return db.knex('e2e_users')
      .where('uber_uuid', uuid)
      .update({
        e2e_password: bcrypt.hashSync(newUserInfo.e2e_password, 10),
        e2e_username: newUserInfo.e2e_username
    })
  },
  userLoginCheck: (user) => {
    return db.knex('e2e_users').where(user)
  },
  updateUserByUuid: (uuid, newData) => {
    return db.knex('e2e_users').where('uber_uuid', uuid).update(newData)
  },
  addUserLocation: (sesh, location, coords) => {
    return db.knex('user_locations')
    .insert({
      user_id: sesh.id,
      name: location.location_name,
      formatted_address: location.address,
      lat: coords.lat,
      lng: coords.lng
    })
  },
  editUserLocation: (sesh, location, coords, id) => {
    return db.knex('user_locations')
    .where('id', id)
    .update({
      name: location.location_name,
      formatted_address: location.address,
      lat: coords.lat,
      lng: coords.lng
    })
  },
  allLocations: (sesh) => {
    return db.knex.raw(`SELECT * from user_locations WHERE user_id=${sesh.id}`);
  },
  addUserTrip: (sesh, name, start, end, mode, originCoords, destinationCoords) => {
    return db.knex('user_trips')
    .insert({
      user_id: sesh.id,
      trip_name: name,
      transit_method_id: mode, //need to change this
      origin_formatted_address: start,
      origin_lat: originCoords.lat,
      origin_lng: originCoords.lng,
      origin_loc_id: start.id, //this needs to change
      destination_formatted_address: start,
      destination_lat: destinationCoords.lat,
      destination_lng: destinationCoords.lng,
      destination_loc_id: start.id //this needs to change
    })
  }
};
