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
    return db.knex('user_locations').insert({
      user_id: sesh.id,
      name: location.location_name,
      formatted_address: location.address,
      lat: coords.lat,
      lng: coords.lng
    })
  },
  editUserLocation: (sesh, location, coords, id) => {
    return db.knex.raw(`UPDATE user_locations set name='${location.location_name}', formatted_address='${location.address}', lat='${coords.lat}', lng='${coords.lng}' WHERE id=${id}`);
  },
  allLocations: (sesh) => {
    return db.knex.raw(`SELECT * from user_locations WHERE user_id=${sesh.id}`);
  }
}
