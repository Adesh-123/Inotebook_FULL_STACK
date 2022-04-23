const express =require('express');
const router =express.Router();
const User=require('../models/User')
const {body,validationResult}=require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET="iamisagoodboy";


// route:1 post data in database
router.post('/createuser',[
     body('name').isLength({min:3}),
     body('email').isEmail(),
     body('password').isLength({min:5}),
],async (req,res)=>{
     // if there is error in filling data  
     let sucess=false;
     const errors=validationResult(req);
     if(!errors.isEmpty()){
          return res.status(400).json({sucess,errors:errors.array()});
     }

     try {
          // check email already exits or not
          let user =await User.findOne({email:req.body.email});
          if(user){
               return res.status(400).json({sucess, error:"with this email user already exits"})
          }
          const salt =await bcrypt.genSalt(10);
          const secpass= await bcrypt.hash(req.body.password,salt)
          // create user 
          user= await User.create({
           name: req.body.name,
           password: secpass,
           email: req.body.email,
         });
         const data={
              user:{id:user.id}
         }
         const authtoken =jwt.sign(data,JWT_SECRET);
         sucess =true;
         res.json({sucess,authtoken});
     } catch(err){
          res.status(500).send("server error");
     }
})


// route:2 user login routes
router.post('/login',[
     body('email' ).isEmail(),
     body('password').exists()
],async (req,res)=>{
      // if there is error in filling data  
      let sucess=false;
      const errors=validationResult(req);
      if(!errors.isEmpty()){
           return res.status(400).json({errors:errors.array()});
      }

      try {
           const {email,password}=req.body;
           const user=await User.findOne({email});
           if(!user){
              return res.status(400).send({sucess,err:"please wirte valid credentials"});
           }
           const passwordcomapre=await bcrypt.compare(password,user.password);
           if(!passwordcomapre){
               return res.status(400).send({sucess,err:"please wirte valid credentials"});
           }
           const data={
               user:{id:user.id}
            }
           const awthtoken =jwt.sign(data,JWT_SECRET);
          sucess=true;
           res.json({sucess, awthtoken});
      } catch (error) {
          res.status(500).send(err);
      }
})

//route:3  getting userdata using  post
 router.post('/userdata',fetchuser,async (req,res)=>{
     try {
          userId= req.user.id;
          const user = await User.findById(userId).select("-password");
          res.send(user);
     } catch (error) {
          res.status(500).send({err:"Internal server error"});
     }
 })


module.exports=router