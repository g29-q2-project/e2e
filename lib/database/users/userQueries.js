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
    return db.knex('e2e_users').where({
      'e2e_username': user.username,
      'e2e_password': user.password
    })
  }
}