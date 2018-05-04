var express = require('express');
var router = express.Router();

/* GET Registration Page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Advocate | Registration' });
});
// Posting data to Registration Page
router.post('/', function(req,res){
  var email  = req.body.email;
  var password = req.body.password;
  res.send(email);


});
module.exports = router;
