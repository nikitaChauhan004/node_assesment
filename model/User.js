var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;


var userSchema = new Schema({
    createdAt : {type: 'date'},
    userName : { type  : 'string'}, // the Name of the User

});



var User = mongoose.model('user', userSchema);

module.exports = User;
