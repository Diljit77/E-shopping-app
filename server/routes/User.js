import User from "../models/User.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const router=express.Router();
router.post("/signup",async (req,res)=>{
    const {name, phone, email,password}=req.body;
    try {
      const existUser= await User.findOne({email:email});
      if(existUser){
        res.status(400).json({message:"user already exist"});

      }  
      const hashpassword=await bcrypt.hash(password,10);
      const result=await User.create({
        name:name,
        phone:phone,
        email:email,
        password:hashpassword
      })
      const token=jwt.sign({email:result.email,id:result._id},process.env.JSON_WEB_TOKEN_KEY);
      res.status(200).json({
        user:result,
        token:token,
      })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"})
    }

})
router.post("/signin",async (req,res) => {
    const {email,password}=req.body;
    console.log(password,email);
 try {
    const existUser=await User.findOne({email:email});
    console.log(existUser)
    if(!existUser){
      return res.status(404).json({ status:false, message:"User not found"})
    }
    const matchpassword=await bcrypt.compare(password,existUser.password);
    if(!matchpassword){
        return res.status(402).json({ status:false,message:"invalid Credentials"});
    }
    const token=jwt.sign({email:existUser.email,id:existUser._id},process.env.JSON_WEB_TOKEN_KEY);
    res.status(200).json({
        user:existUser,
        token:token,
        status:true,
        message:"User Authenticted"
    })

 } catch (error) {
    console.log(error);
    res.status(500).json({message:"smething went wrong"})
 }
})
router.get("/",async (req,res) => {
    const UserList=await User.find();
    if(!UserList){
        res.status(500).json({success:false})
    }
    res.send(UserList)
})
router.delete("/:id",async (req,res) => {
    User.findByIdAndDelete(req.params.id).then(user=>{
        if(user){
            return res.status(200).json({success:true,message:"deleted successfully"})
        }else{
            return res.status(500).json({success:false,message:"user not found "})
        }
    }).catch(err=>{
        return res.status(500).json({success:false,error:err})
    })
})
router.get("/get/count",async (req,res) => {
    const usercount=await User.countDocuments((count)=>count)
    if(!usercount){
        res.status(500).json({success:false})
    }
    res.send({
        usercount:usercount
    })
})
router.put("/:id",async (req,res) => {
    const {name,email,phone,password}=req.body;
    const userexist=await User.findById(req.params.id);
    let newpasword
    if(req.body.password){
        newpasword=bcrypt.hashSync(req.body.password,10)
    }else{
        newpasword=userexist.passwordHash;
    }
    const user=await User.findByIdAndUpdate(req.params.id,{
        name:name,
        phone:phone,
        password:newpasword,
        email:email
    },{new:true})
    if(!user){
return res.status(400).send("the user cannot be updated")
    }
    res.send(user)
})
export default router
