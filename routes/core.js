var express = require('express');
var router = express.Router();

// getting the login page
router.get('/', function(req, res, next) {
    res.render('core', { title: 'Advocate | App' });
});

module.exports = router;