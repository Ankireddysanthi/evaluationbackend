const express=require("express")
const userroute=express.Router();
const {userModel}=require("../model/usermode");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

userroute.post("/reg",async(req,res)=>{
    const  {name,email,gender,password,age,city,is_married}=req.body;
  //  console.log(req.body)
    const exitmail=await userModel.find({email});
    try{
        if(exitmail.length!==0){
            res.send({msg:"already exit email please log in"})
        }else{
            bcrypt.hash(password, 5,async (err, hash)=> {
                const user=new userModel({name,email,gender,password:hash,age,city,is_married})
                await user.save();
                res.send({msg:"register succes"})
            });
        }
    }catch(err){
        res.send({msg:"error msg"})
    }
})

userroute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
   const user=await userModel.findOne({email});
   console.log(user._id)
   if(user){
    bcrypt.compare(password, user.password,(err, result)=> {
      if(result){
        var token = jwt.sign({ "userid": user._id }, 'shhhhh');

        res.send({msg:"login success","toke":token,"username":user.name})
      }
    });
   }else{
    res.send({msg:"please register"})
   }




    }catch(err){
        res.send({msg:"error message"})
    }
})





module.exports={
    userroute
}