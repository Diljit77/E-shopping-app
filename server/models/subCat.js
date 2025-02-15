import mongoose from "mongoose";

const subCatSchema=mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    subCat:{
        type:String,
        required:true
    }

})
subCatSchema.virtual("id").get(function(){
    return this._id.toHexString();
})
subCatSchema.set("toJSON",{
    virtuals:true,
})
const subCat=mongoose.model("SubCat",subCatSchema)
export default subCat;
