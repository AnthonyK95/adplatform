var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate');
var session = require('express-session');


// Getting the login page
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Advocate | Login' });
  });

router.post('/', function(req,res,next){
   if(req.body.username && req.body.password){
      
        // Getting the input values
        var username = req.body.username;
        var password = req.body.password;
       
   

      User.findOne({username: username, password: password}, (err,user)=>{
        if (err){
          return next(err);
        }
        if (!user) {
         res.send('cant find user');
        }
        else{

         req.session.activeuser = user;
         res.redirect('/dashboard');
       
        }
      });
   }

});
  module.exports = router;