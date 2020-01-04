var express = require('express');
var router = express.Router();
const { check, body, validationResult } = require('express-validator');
const contactController = require('../controllers/contact.controller');

router.get('/', function(req, res, next) {
  res.render('contact', {authenticated: req.session.authenticated});
});

router.post('/send',
[
    check('name', 'Invalid name').isLength({ min: 5 }).trim().escape(),
    check('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    check('message', 'Invalid message').isLength({ min: 5 }).trim().escape()
],
async (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const data = Object.assign({}, {authenticated: req.session.authenticated}, { errors: errors.array() });
        return res.render('contact', data);
    }
    const emailData = {
        from: req.body.email,
        to: process.env.ADMIN_EMAIL,
        replyTo: req.body.email,
        subject: `Hello from Your Website! ${req.body.name} has sent you a message`,
        body: req.body.message
    };
    const response = await contactController.sendMail(emailData);
    const data = Object.assign({}, {authenticated: req.session.authenticated});
    let finalData;
    if (response.result === 'success') {
        finalData = Object.assign({}, data, {message: 'Message send'});
    } else {
        finalData = Object.assign({}, data, {message: response.error});
    }
    res.render('contact', finalData);
});

module.exports = router;
