var express = require('express');
var router = express.Router();

// getting the login page
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Advocate | Login' });
  });
  module.exports = router;