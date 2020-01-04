var express = require('express');
var router = express.Router();

/**
 * Render login page
 */
router.get('/', function(req, res, next) {
  res.render('displayuserinfo');
});

module.exports = router;
