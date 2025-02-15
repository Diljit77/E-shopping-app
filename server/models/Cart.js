import mongoose from "mongoose";
const cartSchema=mongoose.Schema({
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
    Quantiy:{
       type:Number,
       required:true

    },
    subtotal:{
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
cartSchema.virtual("id").get(function (){
    return this._id.toHexString();
})
cartSchema.set('toJSON',{
    virtuals:true,
})
const Cart=mongoose.model("Cart",cartSchema)
export default Cart;