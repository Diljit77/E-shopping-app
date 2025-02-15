import mongoose from "mongoose";
const ReviewSchema=mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    customerName:{
        type:String,
        required:true
    }, 
       customerId:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true,
        default:""
    },
    customerRating:{
        type:Number,
        required:true,
        default:1
    },
    dataCreated:{
        type:Date,
        default:Date.now
    }

});
ReviewSchema.virtual("id").get(function(){
    return this._id.toHexString();
})
ReviewSchema.set("toJSON",{
    virtuals:true,
})
const Review=mongoose.model("Review",ReviewSchema)
export default Review;