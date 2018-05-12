var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate');
var session = require('express-session');

// Getting the Dashboard Page
router.get('/', function(req, res, next) {
    if(!req.session.activeuser){
        return res.status(401).send('General Error');
    }
    else{
    // res.write(req.session.activeuser._id);
    res.render('dashboard', {
        title: 'Advocate | Dashboard', 
        id: req.session.activeuser._id //Change this value with the live export of the dom creation
        });
    }
});

// Posting Data to the Page
router.post('/', function (req,res,next){
    // Checking for active sessions
    if (!req.session.activeuser){
        return res.status(401).send('Error on Posting data to the db');
    }
    else{
        res.send('Posted Data');
    }
});


module.exports = router;