var express = require('express');
var router = express.Router();
var passport = require('passport')
var userQueries = require('../controllers/database/users/userQueries')
var db = require('../config/db')
/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/dashboard');
})

router.get('/allUsers', (req, res, next) => {
  userQueries.getAllUsers().then((resp) => res.json(resp))
})

router.get('/auth/uber', passport.authenticate('uber'));
router.get('/auth/uber/callback',
  passport.authenticate('uber', { failureRedirect: '/login' }),
  function(req, res) {
    // insert uber state and code from url
    userQueries.updateUserByUuid(req.session.passport.user.uuid, {
      uber_code: req.query.code,
      uber_state: req.query.state
    }).then((resp) => {
      // Successful authentication, redirect to auth completion OR dashboard
      userQueries.getUserByUuid(req.session.passport.user.uuid).then((resp) => {
        if(resp[0].e2e_password){
          console.log(req.session);
          res.redirect('/dashboard')
        } else {
          res.redirect('/login/completeRegistration');
        }
      })
    })

  })

router.get('/auth/lyft',
  passport.authenticate('lyft', { scope: ['public','profile','rides.read'] }
))

router.get('/lyftAuth', passport.authenticate('lyft', { failureRedirect: '/fail' }),
  (req, res) => {
    console.log(req.session);

  // create entry in user table with our token
  res.redirect('/login/completeRegistration')
})

module.exports = router;
