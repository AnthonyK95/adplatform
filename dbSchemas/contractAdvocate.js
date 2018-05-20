var mongoose = require('mongoose');

var contractSchema = new mongoose.Schema ({
  _id:String,
  company:String,
  deviceID:String,
  deviceType:String,
  confirmSign:String
});

var Contract = mongoose.model('Contract',contractSchema);
module.exports = Contract;
