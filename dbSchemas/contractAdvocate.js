var mongoose = require('mongoose');

// Rebuilding Contract Schema
var contractSchema = new mongoose.Schema ({
    _id:String,
    company:String,
    deviceID:String,
    deviceType:String,
    Status:String,
    Data:{
        Data_Requested_One:String,
        Data_Requested_Two:String
    },
    Time_Period:String,
    Purposes:{
        Purposes_Requested_One:String,
        Purposes_Requested_Two:String
    },
    Third_Parties:String,
    Third_Countries:String,
    Company_Signature:String,
    Response:String,
    Client_Signature:String,
    ID_Transaction:String,
    Automated_Processing:Boolean,
    Profiling:Boolean,
    Manual_Process:Boolean
});


var Contract = mongoose.model('Contract',contractSchema);
module.exports = Contract;
