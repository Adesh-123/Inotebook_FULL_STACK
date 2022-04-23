const jwt = require('jsonwebtoken');
const JWT_SECRET="iamisagoodboy";

const fetchuser=(req,res,next)=>{
    const token = req.header('auth-token');
   if(!token){
       return res.status(401).send({err:"Please try with valid token"});
   }
   try{
       const data=jwt.verify(token,JWT_SECRET);
       req.user=data.user;
       next();
   }catch{
         res.status(401).send('sever error');
   }
}


module.exports =  fetchuser;
