var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate');
var session = require('express-session');
var Product = require('../dbSchemas/productAdvocate');
var Contract = require('../dbSchemas/contractAdvocate');
var fs = require('fs');


// Global Variable to send to render process


var therapis = [];
var deviceDI  = [];
var deviceStuff;
// Getting the Dashboard Page
router.get('/', function(req, res, next) {

    if(!req.session.activeuser){
        return res.status(401).redirect('/');
    }

    else{
        therapis = [];
        deviceDI = [];
        //  add the query for the Company ID
        Product.find({owner:req.session.activeuser._id}, async(err, products) =>{
            if (err) throw err;
            else{
               await products.forEach((data)=> {
                    deviceDI.push (data._id);
                     deviceStuff = data;
               });
            }
            console.log(deviceDI);
           await Contract.find({_id:deviceDI},async (err,data) =>{
               await data.forEach((thedata)=>{
                   if (thedata.Status == "pending"){
                       therapis.push(thedata._id);
                   }
                   else{
                       therapis = [];
                   }
               })
            });
           console.log(therapis);
           //Rendering Process
            res.render('dashboard',{
                title:"Advocate | Dashboard Tools",
                username:req.session.activeuser.username,
                contract:therapis,
                product:deviceDI,
                company:deviceStuff
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
                deviceType: req.body.deviceType,
                BlockchainID:""
            });

            device.save((err,product)=>{
                if(err){
                    return next(err);
                }
                else{
                    res.redirect('/dashboard');
                }
            });
        }
        else{
            res.send('Error on submitting the device');
        }
    }
});


module.exports = router;
