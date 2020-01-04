var express = require('express');
var router = express.Router();

/**
 * Log out a user
 */
router.get('/', function(req, res, next) {
  req.session.user = {};
  req.session.authenticated = false;
  res.render('login');
});

module.exports = router;
