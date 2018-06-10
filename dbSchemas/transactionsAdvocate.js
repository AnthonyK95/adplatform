var mongoose = require('mongoose');
var transactionSchema = new mongoose.Schema ({
    _id:String,
    Company_Signature:String,
    Client_Signature:String,
    Timestamp:String
})


var Transaction = mongoose.model('Transaction',transactionSchema);
module.exports = Transaction;
