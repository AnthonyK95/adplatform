var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate');
var session = require('express-session');
var Product = require('../dbSchemas/productAdvocate');
// Getting the Smart Contract
var Contract  = require('../dbSchemas/contractAdvocate');
var fs = require('fs');



//Getting the Company Dashboard
router.get('/', function(req, res, next) {
    if(!req.session.activeuser){
        return res.status(401).redirect('/');
    }
    else{
        //  add the query for the Companny ID
        Product.find({}, function(err, products) {
            if (err) throw err;

            // Rendering the template of te website
            res.render('company',{
                title:"Advocate | Company Tools",
                username:req.session.activeuser.username,
                // Passing the values to a product variable
                product: products
            });
        });
    }

});

//Analyze the Contract of the company and present it to the user
router.post('/',function(req,res,next){
    if(!req.session.activeuser){
        return res.status(401).redirect('/');
    }
    else{
      if(req.body.deviceID&&req.body.deviceType){
        // Getting the data for the device contract
        var deviceID = req.body.deviceID;
        var deviceType = req.body.deviceType;
        var companyName = req.session.activeuser._id;

        // Creating the temporary contract
        const contract = new Contract({
            _id: deviceID,
            company:companyName,
            deviceID:deviceID,
            deviceType:deviceType,
            confirmSign: "pending"
        });

        contract.save((err,contractfile)=>{
          if(err){
            return next(err);
          }
          else{
          res.send(contractfile);









          }
        });
      }
      else{
        console.log("there was an error");
      }
    }
});



module.exports = router;
