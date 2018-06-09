var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate');
var session = require('express-session');
var Product = require('../dbSchemas/productAdvocate');
// Getting the Scheme Contract 
var Contract  = require('../dbSchemas/contractAdvocate');
var fs = require('fs');
var crypto = require('crypto');


//Getting the Company Dashboard
router.get('/:contractID', function(req, res, next) {
    if(!req.session.activeuser){
        res.redirect('/');
    }
    else{
        //Getting Contract ID
        var deviceID = req.params.contractID;
        // Getting Information from the database
        Contract.find({_id:deviceID},'Data + Time_Period + Purposes + Third_Parties + Third_Countries -_id ',(err,datatodisplay)=>{
           var words= JSON.stringify(datatodisplay);
            console.log(words.data);

            res.render('datatodiv',{
                title:"Advocate | Contract Information",
                username:req.session.activeuser.username,
                deviceID:deviceID,
                uptime:words
            });
        });


    }
});




//Getting the Company Dashboard
router.post('/:contractID', function(req, res, next) {
    if(!req.session.activeuser){
       res.redirect('/')
    }
    else{
        var deviceID = req.params.contractID;  
        var uptime = req.body.uptime;
        if(uptime == undefined){uptime = "Disagree"}

    // Updating the database with new entries before sending them to Block-chain
    Contract.findOneAndUpdate({ _id: deviceID }, { Status: 'Confirmed', Response:uptime }, function(err, consent) {
        if (err) console.log (err);
           res.redirect("/dashboard");
           console.log(consent);
        });
     }
});


module.exports = router;
