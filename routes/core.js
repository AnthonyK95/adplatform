var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



// getting the login page
router.get('/:_id', function(req, res, next) {
    res.render('core', { title: 'Advocate | App' }); res.render('core', { title: 'Advocate | App' });
});

module.exports = router;