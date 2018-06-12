var mongoose = require('mongoose');

// Creating the product Schema
var productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    owner: String,
    deviceID: String,
    companyID:String,
    deviceType:String,
    BlockchainID:String
});

// Export the product to the project
var Product = mongoose.model('Product',productSchema);
module.exports = Product;

