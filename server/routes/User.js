import User from "../models/User.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs" 
import ImageUpload from "../models/imageupload.js";
import cloudinary from "cloudinary"
cloudinary.v2;
 cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})
import multer from "multer"
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

const generatePassword = (length = 12) => {
    return crypto.randomBytes(length)
        .toString("base64") // Convert to a readable format
        .slice(0, length) // Trim to required length
        .replace(/[^a-zA-Z0-9]/g, "A"); // Replace special chars (optional)
};

 // Example: "kdf84ABd29Xp"

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads");
    },
    filename:function (req,file,cb){
  cb(null,`${Date.now()}_${file.originalname}`);
    }
})
let imgArr=[];
const upload=multer({storage:storage})
const router=express.Router();
const sendEmailFun=async(to,subject,text,html)=>{
    const result =await sendEmail(to,subject,text,html);
    if(result.success){
        return true
    }else{
        return false
    }
}

router.post("/signup",async (req,res)=>{
    const {name, phone, email,password}=req.body;
    try {
      const existUser= await User.findOne({email:email});
      if(existUser){
        return  res.json({message:"user already exist",success:false});
 
       }  
      const verfiyCode=Math.floor(100000+Math.random()*900000).toString();
     

      const hashpassword=await bcrypt.hash(password,10);
      const result=await User.create({
        name:name,
        phone:phone,
        email:email,
        password:hashpassword,
        otp:verfiyCode,
        otpexpires:Date.now()+600000
      })
    
   
      const resp=sendEmailFun(email,"verify Email","","Your OTP is "+verfiyCode)
      const token=jwt.sign({email:result.email,id:result._id},process.env.JSON_WEB_TOKEN_KEY)
      res.status(200).json({
        user:result,
        token:token,
        success:true
      })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong",success:false})
    }

})
router.post("/forgetpassword",async (req,res) => {
    const {email}=req.body;
    try {
        const verfiyCode=Math.floor(100000+Math.random()*900000).toString();
        let user;
        const existUser= await User.findOne({email:email});
        if(!existUser){
         return   res.json({status:"FAILED",message:"User is not exist"})
        }
        if(existUser){
            existUser.otp=verfiyCode;
            existUser.otpexpires=Date.now()+600000;
            await existUser.save();
       
        }
        const resp=sendEmailFun(email,"verify Email","", `Dear User,<br><br>
            Your One-Time Password (OTP) for verification is: <b>${verfiyCode}</b><br><br>
            This OTP is valid for <b>5 minutes</b>. Please do not share this code with anyone.<br><br>
            If you did not request this, please ignore this email.<br><br>
            Best regards,<br>
            Bluestock`);
        return res.status(200).json({
            success:true,
            status:"success",
            message:"OTP send"
        })
    } catch (error) {
    
        console.log(error)
    }

    

})
router.post("/verifyemail",async (req,res)=>{
    try {
        const {email,otp}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
  return res.status(400).json({success:false,message:"User not Found"});
        }
        const isCodevalid=user.otp===otp;
        const isnotexpired=user.otpexpires>Date.now();
        if(isCodevalid && isnotexpired){
            user.isVerfied=true;
            user.otp=null;
            user.otpexpires=null;
            await user.save();
            return res.status(200).json({success:true,message:"Email is verified Succesfully"})

        }else if(!isCodevalid){
            res.json({success:false,message:"invalid otp"})
        }else{
            res.status(400).json({success:false,message:"otp expired"})
        }
    } catch (error) {
        console.log("Error is verifyed",error);
        res.status(500).json({success:false,message:"Error in veryfing email"})
        
    }
})
router.get("/:id",async (req,res) => {
    const user=await User.findById(req.params.id);
    if(!user){
        res.status(500).json({msg:"something went wrong"})
    }
    res.send(user);
    
})
router.post("/signin",async (req,res) => {
    const {email,password}=req.body;
    console.log(password,email);
 try {
    const existUser=await User.findOne({email:email});
    // console.log(existUser)
    if(!existUser){
      return res.json({ status:false, message:"User not found"})
    }
    if(existUser.isVerfied===false){
      return  res.json({error:true,isVerify:false,message:"Your account is not verified",status:false})  
      }
 
        const matchpassword=await bcrypt.compare(password,existUser.password);
    if(!matchpassword){
        return res.json({ status:false,message:"invalid Credentials"});
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
router.post("/forgetpassword/changepassword",async (req,res) => {
    const {email,newPass}=req.body;
    try {
        const user=await User.findOne({email:email});
        if(!user){
           return  res.status(404).json({message:"User not found" ,success:false})

        }
        const hashpassword=await bcrypt.hash(newPass,10);
        user.password=hashpassword;
        await  user.save();

        return res.status(200).json({message:"Password Updated succesfully",success:true })
    } catch (error) {
        res.status(500).json({message:err.message})
        console.log(error)
    }
})
router.post("/upload",upload.array("images"),async (req,res) => {
   let imageArrr=[];
    try {
        for(let i=0;i<req?.files?.length;i++){
            const options={
                use_filename:true,
                unique_filename:true,
                overwrite:false
            };
            const img =await cloudinary.uploader.upload(req.files[i].path, options, function (error,result){
imageArrr.push(result.secure_url);
fs.unlnkSync(`uploads/${req.files[i].filename}`);

            })
        }
      let imagesupload=new ImageUpload({
        images:imageArrr,
      });
    imagesupload=await imagesupload.save();
    return res.status(200).json(imageArrr)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }

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
        email:email,
        images:imgArr,
    },{new:true})
    if(!user){
return res.status(400).send("the user cannot be updated")
    }
    res.send(user)
})
router.delete("/deleteimages",async (req,res) => {
    const imgUrl=req.query.img;
    const urlarr=imgUrl.split("/")
    const image=urlarr(urlarr.length-1);
    const imageName=image.split(".")[0];
    const response=await cloudinary.uploader.destroy(imageName,(error,result)=>{

    })
    if(response){
        res.status(200).send(response)
    }
})
router.post("/loginwithgoogle",async (req,res) => {
    let {name,email,phone,password, images}=req.body;
    try {
        const existUser=await User.findOne({email:email})
        if(password===null|| password===undefined){
            password=generatePassword();
        sendEmailFun(email,"Default password","", `Dear User,<br><br>
                your default password is ${password}, please change your password in the account section for security`);
        }
        if(!existUser){
            const result=await User.create({
                name:name,
                phone:phone,
                email:email,
                images:images,
                password:password
            })
            const token=jwt.sign({email:result.email,id:result._id},process.env.JSON_WEB_TOKEN_KEY);
            return res.status(200).send({
                user:result,
                token:token,
                msg:"user Login Succesgully"
            })
          

        }else{
            const existuser=await User.findOne({email:email});
            const token=jwt.sign({email:existuser.email,id:existuser._id},process.env.JSON_WEB_TOKEN_KEY);
            return res.status(200).send({
                user:existuser,
                token:token,
                msg:"user Login Succesgully"
            })
            
        }
    } catch (error) {
        console.log(error)
    }
})
router.put("/changepassword/:id",async (req,res)=>{
    const { email,password,phone,name,newpass,images}=req.body;
    try {
      const existUser= await User.findOne({email:email});
    if(!existUser){
      return  res.json({error:true,msg:"User Not found",success:false})
    }
 console.log(existUser)
    const matchpassword=await bcrypt.compare(password,existUser.password);
let newpassword

if(!matchpassword){
    return res.json({ success:false,message:"password is incorrect"});
}
   if(newpass){
    newpassword=bcrypt.hashSync(newpass,10);

   }else{
    newpass=existUser.password
   }
   
           const user=await User.findByIdAndUpdate(req.params.id,{

            name:name,
            phone:phone,
            email:email,
            password:newpassword,
            images:images 
        },
        {
            new:true
        }
    )
    if(!user){
    return  res.json({message:"the user is not updated",success:false})
    }
    return res.status(200).json({success:true,message:"Updated successfully"})

    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong",success:false})
    }

})
export default router
