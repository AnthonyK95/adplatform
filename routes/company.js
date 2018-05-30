var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate');
var session = require('express-session');
var Product = require('../dbSchemas/productAdvocate');
// Getting the Scheme Contract
var Contract  = require('../dbSchemas/contractAdvocate');
var fs = require('fs');



// Creating the file on the server
function writethefile(name,words){
  // Creating the NEW JSON FILE
  jsonsyntax(words);
  var data = JSON.stringify(words);

  fs.writeFile("./request/"+name+".json",data,(err)=>{
    if(err){
      console.log("There Was An Error");
    }
    else{
      console.log("Json File Was Created Correctly");
    }
  })
}
// Creating the new file for the needs of the user and company
function jsonsyntax(words){

 var word = words;
 var inputData = ({
  "UpTime": "We are going to collect periodically data for the device uptime ",
  "Firmware": "We are going to collect periodically data about device firmware"
 })
//  Final Appending the agreement of the Company
 words["CompanyAgreement"] = inputData;
}



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
        var deviceID = req.body.deviceID;
        var deviceType = req.body.deviceType;
        var companyName = req.session.activeuser._id;

        // Creating the temporary contract
        const contract = new Contract({
            _id: deviceID,
            company:companyName,
            deviceID:deviceID, // The Input Device Serial Key
            deviceType:deviceType,
            confirmSign: "pending"
        });

        contract.save((err,contractfile)=>{
          if(err){
            return next(err);
          }
          else{
            // Taking the json file
            var data = fs.readFileSync('thecontract.json');
            var words = JSON.parse(data);
            console.log(words);
            writethefile(contract._id,words);
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
