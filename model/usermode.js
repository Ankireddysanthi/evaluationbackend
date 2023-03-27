const mongoose=require("mongoose");
const userschma=mongoose.Schema({
    name: String,
email : String,
gender : String,
password : String,
age :Number,
city :String,
is_married : Boolean
});
const userModel=mongoose.model("postdataeve",userschma);
module.exports={
    userModel
}