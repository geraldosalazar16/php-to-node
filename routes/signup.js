var express = require('express');
var router = express.Router();
const { check, body, validationResult } = require('express-validator');
const userController = require('../controllers/user.controller');

/**
 * Render login page
 */
router.get('/', function(req, res, next) {
  res.render('signup');
});

/**
 * Sign up users
 */
router.post('/',
[
  body('firstName', 'Invalid first name').isLength({ min: 1 }), 
  body('lastName', 'Invalid last name').isLength({ min: 1 }), 
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 5 })
  .custom((value, {req, loc, path}) => {
    if (value !== req.body.confirmPassword) {
        // trow error if passwords do not match
        throw new Error("Passwords don't match");
    } else {
        return value;
    }
  }),
  check('securityQ').isIn(['1','2','3','4','5'], 'Invalid security question'),
  body('securityA', 'Invalid security answer', 'Invalid security answer').isLength({ min: 1 }), 
  check('maiserLevel').isIn(['1','2'], 'Invalid maiser level')
],
async (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('signup', { errors: errors.array() });
    }
    const response = await userController.registerUser(req.body);
    if (response.result === 'failure') {
      res.render('signup', {errors: response.result.error});
    } else {
      // Set session info
      req.session.authenticated = true;
      req.session.user = response.user;
      res.render('displayuserinfo', {userInfo: req.body});
    }
});

module.exports = router;
