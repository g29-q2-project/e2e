var express = require('express');
var router = express.Router();
var passport = require('passport')
var userQueries = require('../lib/database/users/userQueries')
var db = require('../config/db')
var uber = require('../lib/uber_api/uber_api_test')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('uber', {uber: 'hello'});
});

module.exports = router;
