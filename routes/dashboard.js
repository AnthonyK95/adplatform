var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate');
var session = require('express-session');
var Product = require('../dbSchemas/productAdvocate');
var Contract = require('../dbSchemas/contractAdvocate');
var fs = require('fs');



// Checking the devices for pending contracts
function checking4contract(id){
    console.log(id);
    Contract.find({_id:id},function(err,contract){
       if(err){
           return next(err);
       }
       else{
        contract.forEach(function (data) {
            if(data.confirmSign == "pending"){
            console.log(data._id);
            }
            else{
                console.log('There was an error on loading Contracts');
            }
        });
       }    

    });
}






// Getting the Dashboard Page
router.get('/', function(req, res, next) {
    if(!req.session.activeuser){
        return res.status(401).redirect('/');
    }
    else{
      Product.find({owner:req.session.activeuser._id}, function(err, products) {
          if (err) {
              return next(err)
          }else{
            products.forEach(function (data) {
                checking4contract(data._id);
            }); 
          
      res.render('dashboard', {
          title: 'Advocate | Dashboard',
          username: req.session.activeuser.username,
          product:products
          });
          
        }
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
                    //Create the notification system
                }
            });
        }
        else{
            res.send('Error on submitting the device');
        }
    }
});


module.exports = router;
