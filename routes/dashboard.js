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
    // res.write(req.session.activeuser._id);
    res.render('dashboard', {
        title: 'Advocate | Dashboard', 
        id: req.session.activeuser.username //Change this value with the live export of the dom creation
        });
    }
});

// Posting Data to the Page
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
                confirmationstatus: "False"
            });
            device.save((err,product)=>{
                if(err){
                    return next(err);
                }
                else{
                    res.send('Added a new device'); // change this one with the reload of the device
                }
            });
        }
        else{
            res.send('there is an error on submiting the device');
        }    
    }
});


module.exports = router;