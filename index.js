const express=require("express")
const app=express();
app.use(express.json());
const{connect}=require("./config/db")
const{userroute}=require("./controllers/userroute");
const{postroute}=require("./controllers/postroute");

require("dotenv").config()

app.use("/users",userroute)

app.use("/posts",postroute)
app.get("/",(req,res)=>{
    res.send("WELCOME")
})






app.listen(process.env.port,async()=>{
    try{
    await connect;
    console.log("connect mongodb")
    }catch(err){
     console.log("error")
    }
    console.log("server connected")
})