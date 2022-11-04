const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type: 'string', required: true,min:3,max:20,unique:true},
    email:{type: 'string', required: true,unique:true},
    password:{type: 'string', required: true,min:8},
    isSetAvatar:{type: 'boolean', required: true,default:false},
    Avatar:{type: 'string', default:''}
})

const User= mongoose.model('user',userSchema);
module.exports= {User}