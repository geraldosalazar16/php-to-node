var express = require('express');
var router = express.Router();
const { sanitizeBody, check, body, validationResult } = require('express-validator');
const incomeController = require('../controllers/income.controller');

/**
 * Render post income page
 */
router.get('/', function(req, res, next) {
  res.render('postincome', {authenticated: req.session.authenticated});
});

router.post('/create',
[
  check('zdate').isISO8601().toDate().withMessage('Invalid Date'),
  check('payer').isLength({ min: 1 }).trim().escape().withMessage('Invalid payer'),
  check('amount').isFloat().withMessage('Invalid amount')
],
async (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const data = Object.assign({}, {authenticated: req.session.authenticated}, { errors: errors.array() });
      return res.render('postincome', data);
    }
    const response = await incomeController.create(req.session.user.userId, req.body);
    const data = Object.assign({}, {authenticated: req.session.authenticated});
    let finalData;
    if (response.result === 'success') {
        finalData = Object.assign({}, data, {message: 'Income created successfully'});
    } else {
        finalData = Object.assign({}, data, {message: response.error});
    }
    res.render('postincome', finalData);
});

module.exports = router;