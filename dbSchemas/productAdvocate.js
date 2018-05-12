var mongoose = require('mongoose');
var User = require('../dbSchemas/userAdvocate')

// Creating the product Schema
var productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    owner: User._id,
    serialnumber: String,
    companyid:String,
    confirmationstatus:String
});

// Export the product to the project
var Product = mongoose.model('Product',productSchema);
module.exports = Product;

