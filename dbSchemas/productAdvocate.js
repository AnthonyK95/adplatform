var mongoose = require('mongoose');

// Creating the product schema
var productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    serialnumber: String,
    companyid:String,
    confirmationstatus:String
});

// Export the product to the project
var Product = mongoose.model('Product',productSchema);
module.exports = Product;

