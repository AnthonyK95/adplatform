var mongoose = require('mongoose');

// Contract Schema
var contractSchema = new mongoose.Schema ({
  _id:String,
  company:String,
  deviceID:String,
  deviceType:String,
  Status:String
});

var Contract = mongoose.model('Contract',contractSchema);
module.exports = Contract;
