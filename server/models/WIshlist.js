import mongoose from "mongoose";
const myListSchema=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    images:
        {
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    userId:{
  type:String,
 required:true
    }

})
myListSchema.virtual("id").get(function (){
    return this._id.toHexString();
})
myListSchema.set('toJSON',{
    virtuals:true,
})
const MyList=mongoose.model("MyList",myListSchema)
export default MyList;