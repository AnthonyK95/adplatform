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
        Contract.findOne({_id:deviceID},function(err,words) {
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
        var contractID = req.params.contractID;  
        var Data = req.body.Data;
        var Time_Period = req.body.Time_Period;
        var Purposes = req.body.Purposes;
        var Third_Parties = req.body.Third_Parties;
        var Third_Countries = req.body.Third_Countries;
        var Automated_Processing = req.body.Automated_Processing;
        var Profiling = req.body.Profiling;
        var Manual_Process = req.body.Manual_Process;

        if(Data == undefined){uptime = "Disagree"}
        if(Time_Period == undefined){uptime = "Disagree"}
        if(Purposes == undefined){uptime = "Disagree"}
        if(Third_Parties == undefined){uptime = "Disagree"}
        if(Third_Countries == undefined){uptime = "Disagree"}
        if(Automated_Processing == undefined){uptime = "Disagree"}
        if(Profiling == undefined){uptime = "Disagree"}
        if(Manual_Process == undefined){uptime = "Disagree"}
         

    // Updating the database with new entries before sending them to Block-chain
    Contract.findOneAndUpdate({ _id: contractID }, { Status: 'Confirmed', Response:uptime }, function(err, consent) {
        if (err) console.log (err);
           res.redirect("/dashboard");
           console.log(consent);
        });
     }
});


module.exports = router;
