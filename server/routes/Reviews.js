import Review from "../models/Review.js";
import express from "express"
const router=express.Router();


router.get("/",async(req,res)=>{
    let review=[];
    if(req.query.productId!==undefined && req.query.productId!==null && req.query.productId!==""){
        review=await Review.find({productId:req.query.productId});
    }else{
        review=await Review.find()
    }
    if(!review){
        res.status(500).json({success:false, message:"no Review"})
    }
    return res.status(200).json(review)
})
router.get("/:id",async (req,res)=>{
    const review =await Review.findById(req.params.id);
    if(!review){
        res.status(500).json({success:false, message:"no Review"})
    }
    return res.status(200).json(review)
})
router.post("/add",async(req,res)=>{
    let review=new Review({
        customerName:req.body.customerName,
        productId:req.body.productId,
        review:req.body.review,
        customerRating:req.body.customerRating,
        customerId:req.body.customerId
    })
    if(!review){
        res.status(500).json({
            error:err,
            success:false
        })
    }
    review =await review.save()
    res.status(201).json(review);
})
export default router;