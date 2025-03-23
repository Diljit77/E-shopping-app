import Product from "../models/product.js";
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
router.get("/myreview/:id",async (req,res) => {
    const review = await Review.find({ _id: req.params.id }); 
    if(!review){
        return res.status(404).json({message:"review not found"})
    }
    return res.send(review);
})
router.get("/usersreview/:id",async (req,res) => {
    try {
        const reviews=await Review.find({customerId:req.params.id});
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "No reviews exist", success: false });
        }

        // Fetch product details for each review
        const reviewsWithProductDetails = await Promise.all(
            reviews.map(async (review) => {
                const product = await Product.findById(review.productId);
                return {
                    ...review.toObject(),
                    product: product || null, // If product is not found, set it to null
                };
            })
        );
        
        return res.send({ reviews: reviewsWithProductDetails });

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong",success:false})
    }
  
})
router.get("/:id",async (req,res)=>{
    const review = await Review.find({ _id: req.params.id }); // ✅ Correct

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
router.delete("/:id",async (req,res) => {
    try {
        const review=await Review.findByIdAndDelete(req.params.id);
        if(!review){
            return res.status(404).json({message:"no such review exist",success:false})
        }
   
        return res.status(200).json({message:"review deleted succesfully",success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false});
        console.log(error)
    }
    
})
router.put("/:id",async (req,res) => {
    try{
        const review=await Review.findById(req.params.id);
        if(!review){
            return res.status(404).json({message:"review not found",success:false})
        }
        const updatedreview=await Review.findByIdAndUpdate(req.params.id,{
            customerName:req.body.customerName,
            productId:req.body.productId,
            review:req.body.review,
            customerRating:req.body.customerRating,
            customerId:req.body.customerId
        },{new:true});
    if(updatedreview){
        return res.status(404).json({message:"the review is not updated",success:false})
    }
    return res.status(200).json({message:"the review is updated succesfully",success:true})
    }catch(err){
console.log(err);
res.status(500).json({message:err.message,success:false});
    }
    
})

export default router;