var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate');





/* GET Registration Page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Advocate | Registration' });
});
// Posting data to Registration Page
router.post('/', function(req,res,next){
    // Checking the fields for input
    if(req.body.email&&req.body.username&&req.body.password){

    const credentials = new User({
        _id: new mongoose.Types.ObjectId(),
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    });
    credentials.save((err,user)=>{
        if(err){
          return next(err)
        }
        else{
            res.redirect('/core');
        }
      })
    }
    else{
        res.redirect('/registration')
    }

});
module.exports = router;
