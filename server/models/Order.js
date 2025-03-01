
import mongoose from "mongoose";

const OrderSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    paymentId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    products:
    [
        {
            productName:{
                type:String,
            },
            Quantiy:{
                type:Number,
            },
            price:{
                type:Number,
            },
            Images:{
                type:String
            },
            subtotal:{
                type:Number
            }


        },
    ],
    Date:{
        type:Date,
        default:Date.now()
    },
   
})
OrderSchema.virtual("id").get(function (){
    return this._id.toHexString();
})
OrderSchema.set('toJSON',{
    virtuals:true,
})
const Order=mongoose.model("Order",OrderSchema)
export default Order;