var express = require('express');
var router = express.Router();
const { check, body, validationResult } = require('express-validator');
const userController = require('../controllers/user.controller');

/**
 * Render login page
 */
router.get('/', function(req, res, next) {
  res.render('login');
});

/**
 * Login user in
 */
router.post('/',
[
    check('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 5 }).trim().escape()
],
async (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('login', { errors: errors.array() });
    }
    const response = await userController.login(req.body);
    if (response.result === 'failure') {
      res.render('login', {errors: response.result.error});
    } else {
        // Set session info
        req.session.authenticated = true;
        req.session.user = response.user;
        res.render('postincome', {authenticated: true});
    }
});

module.exports = router;
