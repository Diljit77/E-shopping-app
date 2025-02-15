
import cloudinary from "cloudinary"
cloudinary.v2;
import plimit from "p-limit";

 cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})
import Category  from "../models/category.js";

import express from "express"
const router=express.Router();
router.get("/",  async (req,res)=>{
    const CategoryList=await Category.find();
    if(!CategoryList){
       return  res.status(500).json({success:false})
    }
         return   res.send(CategoryList);
});
router.post("/create",async (req,res)=>{
    const limit=plimit(2);
    const imagetoUpload=req.body.images.map((image)=>{
        return limit(async ()=>{
          
            const result=await cloudinary.uploader.upload(image)
           // console.log(image)
            return result;
        });
    });
    const uploadstatus=await Promise.all(imagetoUpload);
    const imgURl=uploadstatus.map((item)=>{
        return item.secure_url
    });
    if(!uploadstatus){
        return res.status(500).json({
            error:"image is not found",
            status:false
        })
    }
let category=new Category({
    name:req.body.name,
    images:req.body.images,
    color:req.body.color

})
if(!category){
 res.status(500).json({
    error:err,
    success:false
})

}
category=await category.save();
 return res.status(201).json({category})

})
router.get("/:id" , async (req,res)=>{
const category=await Category.findById(req.params.id);
if(!category){
    res.status(500).json({message:"The Category with the given ID was not found"}

    )

}
return res.status(200).send(category)
})
router.delete("/:id",async (req,res)=>{
    const deletUser=await Category.findByIdAndDelete(req.params.id)
    if(!deletUser){
        res.status(404).json({
            message:"Category not found",
            success:false
        })
    }
    res.status(200).json({
        success:true,
        message:"deleted Successfully"
    })
    
})
router.put("/:id",async (req,res)=>{
    const limit=plimit(2);
    const imagetoUpload=req.body.images.map((image)=>{
        return limit(async ()=>{
          
            const result=await cloudinary.uploader.upload(image)
           // console.log(image)
            return result;
        });
    });
    const uploadstatus=await Promise.all(imagetoUpload);
    const imgURl=uploadstatus.map((item)=>{
        return item.secure_url
    });
    if(!uploadstatus){
        return res.status(500).json({
            error:"image is not found",
            status:false
        })
    }
    const category=await Category.findByIdAndUpdate(
        req.params.id,{
            name:req.body.name,
            image:imgURl,
            color:req.body.color
        },
        {new:true}
    )
    if(!category){
        return res.status(500).json({
            message:"Category Cannot be Updated",
            succes:false
        })
    }
res.send({category})
})
export default router;

