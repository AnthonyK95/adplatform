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
router.get('/', function(req, res, next) {

    if(!req.session.activeuser){
        return res.status(401).redirect('/');
    }
    else{

        //  add the query for the Companny ID
        Product.find({companyID:req.session.activeuser.username}, function(err, products) {
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
          var  deviceID = req.body.deviceID;
          var  deviceType = req.body.deviceType;
          var  companyName = req.session.activeuser._id;


          //Getting variables from requested Contract(JSON FORMAT)
          var data = fs.readFileSync('thecontract.json');
          var words = JSON.parse(data);
          var dataRequestOne = words.Object_One;
          var dataRequestTwo = words.Object_Two;
          var Time_Period = words.Time_Period;
          var Purposes = words.Purposes;
          var Third_Parties = words.Third_Parties;
          var Third_Countries = words.Third_Countries;
          var Automated_Processing = words.Automated_Processing;
          var Profiling = words.Profiling;
          var Manual_Process = words.Manual_Process;

          console.log(dataRequestOne,dataRequestTwo);

        // Creating the Requested Contract
        var contract = new Contract({
            _id: deviceID,
            company:companyName, // Getting the ID of Company
            deviceID:deviceID,  // The Input Device Serial Key(auto generated)
            deviceType:deviceType,
            Status: "pending",
            Data:dataRequestOne,
            Time_Period:Date.now(),
            Purposes:Purposes,
            Third_Parties:Third_Parties,
            Third_Countries:Third_Countries,
            Response:"",
            Company_Signature:"1223",
            Client_Signature:"1423",
            ID_Transaction:"1213",
            Automated_Processing:false,
            Profiling:false,
            Manual_Process:false
        });

        contract.save((err,contractfile)=>{
          if(err){
            console.log(err);
          }
          else{
            res.redirect('/company');
          }
        });

      }
      else{
        console.log("there was an error");
      }
    }
});



module.exports = router;
