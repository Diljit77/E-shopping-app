
import mongoose from "mongoose";

const categorySchema=mongoose.Schema({
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
categorySchema.virtual("id").get(function (){
    return this._id.toHexString();
})
categorySchema.set('toJSON',{
    virtuals:true,
})
const Category=mongoose.model("Category",categorySchema)
export default Category;