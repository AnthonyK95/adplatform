var express = require('express');
var router = express.Router();

// getting the login page
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Advocate | Login' });
  });

router.post('/', function(req,res){
    var name  = req.body.username;
    var password = req.body.password;
    res.send(name);
});
  module.exports = router;