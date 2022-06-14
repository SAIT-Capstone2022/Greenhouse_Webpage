const mongoose = require('mongoose');

const UserSchema = new Schema({
    username : {type:String, required:true,unique:true},
    password : {type:String, required:true},
    phonenumber : {type:String, default: 0, },
    firstname : {type:String, required:true},
    lastname : {type:String, required:true}
});



module.exports = mongoose.model('User', UserSchema);