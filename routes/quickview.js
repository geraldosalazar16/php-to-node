var express = require('express');
var router = express.Router();
const incomeController = require('../controllers/income.controller');

router.get('/',
    async (req, res, next) => {
        const report = await incomeController.report(req.session.user.userId);
        const data = Object.assign({}, {authenticated: req.session.authenticated}, report);
        res.render('quickview', data);
    }
);

module.exports = router;