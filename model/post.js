const mongoose=require("mongoose");
const postschma=mongoose.Schema({
    title: String,
body: String,
device: String,
no_of_comments : Number,
userid:String
})
const postModel=mongoose.model("postdata",postschma);
module.exports={
    postModel
}