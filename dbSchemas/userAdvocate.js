var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Creating the user schema
var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    username: String,
    password: String
});
    //Export the user model to the project
    var User = mongoose.model('User', userSchema);
    module.exports = User;