const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type: String, required: true,min:3,max:20,unique:true},
    email:{type: String, required: true,unique:true},
    password:{type: String, required: true,min:8},
    isSetAvatar:{type: Boolean, required: true,default:false},
    Avatar:{type: String, default:''},
    token:String
})

const User= mongoose.model('user',userSchema);
module.exports= {User}