var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate');
var session = require('express-session');
var Product = require('../dbSchemas/productAdvocate');

// Getting the Dashboard Page
router.get('/', function(req, res, next) {
    if(!req.session.activeuser){
        return res.status(401).redirect('/');
    }
    else{
      Product.find({}, function(err, products) {
          if (err) throw err;
      res.render('dashboard', {
          title: 'Advocate | Dashboard',
          username: req.session.activeuser.username,
          product:products
          });
        });
    }
});

// Post new devices to dashboard
router.post('/', function (req,res,next){
    // Checking for active sessions
    if (!req.session.activeuser){
        return res.status(401).send('Error on Posting data to the db');
    }
    else{
        if(req.body.deviceID&&req.body.companyID){
            const device = new Product({
                _id:new mongoose.Types.ObjectId(),
                owner:req.session.activeuser._id,
                deviceID:req.body.deviceID,
                companyID:req.body.companyID,
                deviceType: req.body.deviceType
            });
            device.save((err,product)=>{
                if(err){
                    return next(err);
                }
                else{
                    //change this with active notification and product component show

                    // replace this line with the embedded alert notification

                }
            });
        }
        else{
            res.send('Error on submitting the device');
        }
    }
});


module.exports = router;
