var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Creating the user schema
var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password:  {type: String, required: true, unique: true}
});
    //Export the user model to the project
    var User = mongoose.model('User', userSchema);
    module.exports = User;