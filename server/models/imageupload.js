import mongoose from "mongoose";

const ImageSchema=mongoose.Schema({
  
    images:[
    {
        type:String,
        required:true
    }
],

})
ImageSchema.virtual("id").get(function (){
    return this._id.toHexString();
})
ImageSchema.set('toJSON',{
    virtuals:true,
})
const ImageUpload=mongoose.model("ImageUpload",ImageSchema)
export default ImageUpload;