const {User}= require('../models/userModel');
const bcrypt= require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()
const register= async(req,res,next)=>{
   try{
   const {username,password,email}=req.body;
   const usernameCheck= await User.findOne({username});
   if(usernameCheck){
    return res.send({status:false,message:"username already used"});

   }
   const emailCheck= await User.findOne({email});
   if(emailCheck){
    return res.send({status:false,message:"email already used"});
   }
   const hashedPassword= await bcrypt.hash(password,8);
   
   const user= await User.create({email,username,password:hashedPassword});
   delete user.password;
   return res.json({status:true,user});
}
catch(error){
   return res.json({status:false,message:error.message})
}
}

const login= async(req,res,next)=>{
   try {
      const {username,password}=req.body;
      const userexist= await User.findOne({username});
      if(!userexist) {
         return res.json({message:`User doesn't exist`,status:false})
      }
      if(userexist){
        const passwordMatch=await bcrypt.compare(password,userexist.password);
        if(!passwordMatch){
         return res.json({message:`password doesn't match`,status: false})
        }else{
         delete userexist.password;
         const jwtsecretkey= process.env.JWT_SECRET_KEY;
        let token= jwt.sign({data:userexist.password,exp: Math.floor(Date.now() / 1000) + (60 * 60)},jwtsecretkey)
         return res.cookie('token','mytoken',{httpOnly:true,maxAge:360000}).json({status:true,token:token});
         
        }
      }
   } catch (error) {
      return res.json({status:false,message:error.message})
   }

}
module.exports= {register,login}
