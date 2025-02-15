import mongoose from "mongoose";
import Product from "../models/product.js";
import subCat from "../models/subCat.js";
import Category from "../models/category.js";
import express from "express"

const router=express.Router();
router.get('/',async (req,res)=>{
try {
  if(req.query.page!==undefined && req.query.perPage!==undefined){
   let  subCategoryList=await subCat.find().populate("category").skip((page-1)*perPage).limit(perPage).exec();
   if(!subCategoryList){
    res.status(500).json({success:false})
}
res.status(200).json(subCategoryList)

  }else{
    let  subCategoryList=await subCat.find().populate("category")
    if(!subCategoryList){
        res.status(500).json({success:false})
    }
    res.status(200).json(subCategoryList)
  }

}catch (error) {
    console.log(error)
    res.status(404).json({message:error});
    }

})
router.get("/:id",async (req,res) => {
    const subCat=await subCat.findById(req.params.id).populate("category");
    if(!subCat){
        res.status(500).json({message:"this sub Category with given ID is Nnot found"})
    }
    return res.status(200).send(subCat)
})
router.post("/create",async (req,res) => {
    const category = await Category.findById(req.body.category);
    if(!category){
        res.status(500).json({success:false,message:"The Category not exist"})
    }
    let subcat=new subCat({
        category:req.body.category,
        subCat:req.body.subCat
    })
    subcat=await subcat.save();
    if(!subcat){
        res.status(404).json({message:"The product is not save"})
    }
    res.send(subcat);
})
router.delete("/:id",async (req,res) => {
    const deletedSubCat=await subCat.findByIdAndDelete(req.params.id);
    if(!deletedSubCat){
        res.status(404).json({
            message:"Sub Category not found",
            success:false
        })

    }
    res.status(200).json({
        success:true,
        message:"SUb Category Deleted"
    })
})
router.put("/:id",async (req,res) => {
    const updatesubCat=await subCat.findByIdAndUpdate(
        req.params.id,
        {
            category:req.body.category,
            subCat:req.body.subCat
        },{new:true}
    )
    if(!subCat){
        return res.status(500).json({
            message:"Sub Category was Updated",
            success:false
        })
    }
    res.status(200).json({message:"updated succesfully"})

    
})
export default router;