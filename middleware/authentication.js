const jwt=require("jsonwebtoken");
const auth=(req,res,next)=>{

const token=req.headers.authorization;
if(token){
    const decoded=jwt.verify(token, 'shhhhh');
    console.log(decoded)
    if(decoded){
        
        req.body.userid=decoded.userid;
        next()
    }else{
        res.send({msg:"please login"})
    }
}else{
    res.send({msg:"error"})
}

}
module.exports={
    auth
}