import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
       
  
    },
    images:[
   {
    type:String,
required:true
   }
    ],
    email:{
        type:String,
        required:true,
        unique:true
    },
    isVerfied:{
type:Boolean,
default:false
    },
    otp:{
type:String
    },
    otpexpires:{
        type:Date,
        default:Date.now
            },
     password:{
        type:String,
    
    },


})
userSchema.virtual('id').get(function (){
    return this._id.toHexString();
});
userSchema.set("toJSON",{
    virtuals:true
})
const User=mongoose.model("User",userSchema)
export default User;