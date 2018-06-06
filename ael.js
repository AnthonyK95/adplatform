var mongoose = require('mongoose');
var Contract = require('../adplatform/dbSchemas/contractAdvocate')
mongoose.connect('mongodb://localhost/advocate');

Contract.find({},function (err,contract){
    contract.forEach(function (data) {
        if(data.Status == "pending"){
            console.log(data) ;
        }
         
    })
})