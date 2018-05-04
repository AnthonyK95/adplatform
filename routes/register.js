var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});
router.post('/', function(req,res,next){
  var email  = req.body.email;
  res.send(email)
});
module.exports = router;
