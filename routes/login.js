var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



// getting the login page
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Advocate | Login' });
  });

router.post('/', function(req,res){
    var username  = req.body.username;
    var password = req.body.password;

});
  module.exports = router;