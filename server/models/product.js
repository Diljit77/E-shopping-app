
import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }, 
     brand:{
        type:String,
        default:""
    },
    price:{
        type:String,
        default:0
    },
    images:[
        {
            type:String,
            required:true,
        }
    ],
    catName:{
        type:String,
        default:""
    },  
    subcatId:{
        type:String,
        default:""
    },
    subCat:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"SubCat",
        default:""
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
  countInStock:{
type:Number,
required:true,

  }, 
   
    rating:{
type:Number,
default:0
    },
    numReviews:{
type:Number,
default:0
    },
    isfeatured:{
      type:Boolean,
      default:false,
    },
    discount:
        {
       type:Number,
       required:true,
    },

    productRam:[
        {
             type:String,

    },],
    productSize:[
        {
             type:String,

    },],
    productWeight:[
        {
             type:String,

    },],
    datecreated:{
      type:Date,
      default:Date.now,
    }


})
const Product=mongoose.model("Product",productSchema)
export default Product;

