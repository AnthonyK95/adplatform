var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate')
var session = require('express-session');



// Getting the Main-App Page
router.get('/', function(req, res, next) {
    if(!req.session.activeuser){
        return res.status(401).send('General Error');
    }
    else{
    // res.write(req.session.activeuser._id);
    res.render('dashboard', {
        title: 'Advocate | Dashboard', 
        id: req.session.activeuser._id
        });
    }
});

module.exports = router;