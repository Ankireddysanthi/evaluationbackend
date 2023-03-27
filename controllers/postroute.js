const express=require("express");
const postroute=express.Router();
const{postModel}=require("../model/post");
const{auth}=require("../middleware/authentication")

postroute.post("/add",auth,async(req,res)=>{
     const data=req.body;
     try{
        const postdata=new postModel(data);
        await postdata.save();
        res.send({msg:"data added successfully"})

     }catch(err){
       res.send({msg:"error"})
     }
})
  postroute.get("/",auth,async(req,res)=>{
   try{

    let data=await postModel.find({"userid":req.body.userid});
    if(data.length!==0){
        res.send(data)
    }else{
        res.send({msg:"no data"})
    }

   }catch(err){
  res.send({msg:"error"})
   }


  })
postroute.patch("/update/:id",auth,async(req,res)=>{
    const{id}=req.params;
    const payload=req.body;
    try {
        const post=await postModel.find({_id:id});
        if(post.length>0){
            await postModel.findByIdAndUpdate({_id:id},payload)
            res.send({msg:"data updated"})
        }else{
            res.send({msg:"post  does not exit"})
        }
        
    } catch (error) {
res.send({msg:"error"})
    }

})
postroute.delete("/delete/:id",auth,async(req,res)=>{
    const{id}=req.params;
    const payload=req.body;
    try {
        const post=await postModel.find({_id:id});
        if(post.length>0){
            await postModel.findByIdAndDelete({_id:id},payload)
            res.send({msg:"data deleted"})
        }else{
            res.send({msg:"post  does not exit"})
        }
        
    } catch (error) {
res.send({msg:"error"})
    }

})

postroute.get("/top",auth,async(req,res)=>{
    try {
        const post=await postModel.find({userid:req.body.userid}).sort({no_of_comments:-1}).limit(3);
        if(post.length>0){
            res.send(post);
        }else{
            res.send({msg:"you have not posted anything"})
        }
        
    } catch (error) {
        
    }
})



module.exports={
    postroute
}