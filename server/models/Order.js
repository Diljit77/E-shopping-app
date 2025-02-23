
import mongoose from "mongoose";

const OrderSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    images:[
    {
        type:String,
        required:true
    }
],
color:{
    type:String,
    required:true
}
})
OrderSchema.virtual("id").get(function (){
    return this._id.toHexString();
})
OrderSchema.set('toJSON',{
    virtuals:true,
})
const Order=mongoose.model("Order",OrderSchema)
export default Order;