var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate');
var session = require('express-session');
var Product = require('../dbSchemas/productAdvocate');
// Getting the Scheme Contract 
var Contract  = require('../dbSchemas/contractAdvocate');
var fs = require('fs');


//Getting the Company Dashboard
router.get('/:contractID', function(req, res, next) {
    if(!req.session.activeuser){
        res.redirect('/');
    }
    else{

        // Getting the Contract
        var deviceID = req.params.contractID;        
        fs.readFile('./request/'+deviceID+'.json',(err,data)=>{
            if(err){}
            else{
                var data = JSON.parse(data);
                console.log(data.AdvocatePrivacyReview[0].Company);
            }
        })
        

         // Rendering the process with the contact
        res.render('datatodiv', {
            title: 'Advocate | Contract Info',
            deviceID: deviceID
        }); 
    }
    
});


//Getting the Company Dashboard
router.post('/', function(req, res, next) {
    if(!req.session.activeuser){
       res.redirect('/')
    }
    else{
        res.send('Sending Data To BlockChain');
    }
});


module.exports = router;
