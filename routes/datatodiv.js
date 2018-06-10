var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate');
var session = require('express-session');
var Product = require('../dbSchemas/productAdvocate');
// Getting the Contract Scheme 
var Contract  = require('../dbSchemas/contractAdvocate');
//Getting the Transaction Scheme
var Transaction = require('../dbSchemas/transactionsAdvocate');
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
router.post('/:contractID',async function(req, res, next) {
    if(!req.session.activeuser){
       res.redirect('/')
    }
    else {

        //Public Variables in order to get the data from db
        var company;
        var deviceID;
        var deviceType;
        var contractID = req.params.contractID;  
        var Data_Requested_One;
        var Data_Requested_Two;
        var Time_Period;
        var Purposes_Requested_One;
        var Purposes_Requested_Two;
        var Third_Parties;
        var Third_Countries;
        var Automated_Processing;
        var Profiling ;
        var Manual_Process;
        var comp_Signature;


       await Contract.findOne({_id:contractID},function(err,words) {
            company = words.company;
            deviceID = words.deviceID;
            deviceType = words.deviceType;
            Data_Requested_One = words.Data.Data_Requested_One;
            Data_Requested_Two = words.Data.Data_Requested_Two;
            Time_Period = words.Time_Period;
            Purposes_Requested_One = words.Purposes.Purposes_Requested_One;
            Purposes_Requested_Two = words.Purposes.Purposes_Requested_Two;
            Third_Parties = words.Third_Parties;
            Third_Countries = words.Third_Countries;
            Automated_Processing = words.Automated_Processing;
            Profiling = words.Profiling;
            Manual_Process = words.Manual_Process;
            comp_Signature = words.Company_Signature;
              
        })
        console.log(Data_Requested_One)
        var data_one = req.body.data_one;
        var data_two = req.body.data_two;
        if(data_one == undefined){data_one = "Disagree"}else{data_one = "Agreed"}
        if(data_two == undefined){data_two = "Disagree"}else{data_two = "Agreed"}

        var response_data_one = data_one + " to Data: "+ Data_Requested_One + " Purpose: "+ Purposes_Requested_One;
        var response_data_two = data_two + " to Data: "+ Data_Requested_Two + " Purpose: "+ Purposes_Requested_Two;
        
        var tohash = company+deviceID+deviceType+Data_Requested_One+Data_Requested_Two+Time_Period+Purposes_Requested_One+Purposes_Requested_Two+Third_Parties+Third_Countries+Automated_Processing+Profiling+Manual_Process+response_data_one+response_data_two;
        var hash = crypto.createHash('sha256').update(tohash).digest('hex');
        var client_Signature = hash;

        var transactionID =comp_Signature+req.session.activeuser._id;
        var transaction = new Transaction({
            _id:transactionID,
            Company_Signature:comp_Signature,
            Client_Signature:client_Signature,
            Timestamp:Date.now()
        });
         

    // Updating the database with new entries before sending them to Block-chain
  await Contract.findOneAndUpdate({ _id: contractID }, 
        { Status: 'Confirmed',
        Response:{Data_One:response_data_one,Data_Two:response_data_two},ID_Transaction:transactionID,Client_Signature:client_Signature},
        async function(err, consent) {
        if (err) console.log (err);
           await transaction.save((err,transaction)=>{
                if (err) console.log(err);
                else{console.log(transaction);}
            });
           res.redirect("/dashboard");
           console.log(consent);
        });
     }
});


module.exports = router;
