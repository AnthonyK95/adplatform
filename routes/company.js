var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate');
var session = require('express-session');
var Product = require('../dbSchemas/productAdvocate');


//Getting the Company Dashboard
router.get('/', function(req, res, next) {
    if(!req.session.activeuser){
        return res.status(401).redirect('/');
    }
    else{
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

//Getting the values of the boxes and Posting them the user
router.post('/',function(req,res,next){
    if(!req.session.activeuser){
        return res.status(401).redirect('/');
    }
    else{
        // Posting the contract of the devices
    }
});



module.exports = router;