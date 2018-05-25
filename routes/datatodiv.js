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
            if(err){
                return next(err)
            }
            else{
                var data= JSON.parse(data);
                var uptime   = data.CompanyAgreement.UpTime;
                var firmware = data.CompanyAgreement.Firmware;
                  // Rendering the process with the contact
                    res.render('datatodiv', {
                        title: 'Advocate | Contract Info',
                        deviceID: deviceID,
                        username:req.session.activeuser.username,
                        uptime:uptime,
                        firmware: firmware
                    }); 
            }
        })
    }
});




//Getting the Company Dashboard
router.post('/:contractID', function(req, res, next) {
    if(!req.session.activeuser){
       res.redirect('/')
    }
    else{
        var deviceID = req.params.contractID;  
        var uptime = req.body.uptime
        var firmware = req.body.firmware
        if(uptime == undefined){uptime = "Disagree"  }
        if(firmware == undefined){ firmware = "Disagree"}
        fs.readFile('./request/'+deviceID+'.json',(err,data)=>{
            if(err){
                return next(err)
            }
            else{
        var userConsent = ({
            UpTime:"the user with device id " + deviceID +" has " + uptime,
            Firmware:"the user with device id " + deviceID+" has " + firmware,
        })
        var file = fs.readFileSync('./request/'+deviceID+'.json');
        var Jfile = JSON.parse(file);
        Jfile["ClientAgreement"] = userConsent;
        var thedata = JSON.stringify(Jfile);
      
        // Saving the final contract to server and update the database with final appending
        fs.writeFile("./request/"+deviceID+".json",thedata,(err,finaldata)=>{
            if(err){return next(err)}
            else{
                    // Updating the database
                    Contract.findOneAndUpdate({ _id: deviceID }, { confirmSign: 'Confirmed' }, function(err, finalContract) {
                        if (err) throw err;
                        // After Updating the Contract Return The Json for verification
                        res.redirect("/dashboard");
                        console.log(finalContract);
                      });
                }
              })  
            }
        })    
     }
});


module.exports = router;
