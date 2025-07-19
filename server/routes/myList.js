import express from "express";
import Cart from "../models/Cart.js";
import MyList from "../models/WIshlist.js";
import mongoose from "mongoose";
const router=express.Router();

router.get("/",async (req,res) => {

try {
    
 
        const myList=await MyList.find(req.query)
        if(!myList){
            res.status(500).json({success:false, message:"There is no product"})
        }
        res.status(200).json(myList);
    
} catch (error) {
    res.status(400).json({success:false, message:"something went wrong"})
}

   
 
    
    })
router.post("/add",async (req,res) => {
    let item=await MyList.find({productId:req.body.productId});

    if(item.length!==0){
res.status(401).json({ status:false,message:"the product is alredy added"})
    }else{

    
    let myList=new MyList({
        productName:req.body.productName,
        images:req.body.images,
        rating:req.body.rating,
        price:req.body.price,
        
    productId:req.body.productId,
    userId:req.body.userId
  
    })
    myList=myList.save();
    if(!myList){
        res.status(500).json({message:"Something Wrong",status:false})
    }
    res.status(201).json({status:true, myList})
}
})




// Delete Cart Route
router.delete("/:id", async (req, res) => {
    try {
        const itemId = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({ message: "Invalid ObjectId" });
        }

        const objectId = new mongoose.Types.ObjectId(itemId);

        const deleteditem = await MyList.findByIdAndDelete(objectId);
        if (!deletedCart) {
            return res.status(404).json({ message: "Product not removed!something went wrong" });
        }

        res.status(200).json({ message: "Removed  Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;