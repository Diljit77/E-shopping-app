import express from "express";
import Cart from "../models/Cart.js";
import mongoose from "mongoose";
const router=express.Router();

router.get("/",async (req,res) => {
    try{
        const CartList=await Cart.find(req.query)
        if(!CartList){
            res.status(500).json({success:false, message:"There is no product"})
        }
        res.status(200).json(CartList);
    }catch(err){
        res.status(500).json({message:err,success:false})
    }
})
router.post("/add",async (req,res) => {
    let carts=await Cart.find({productId:req.body.productId});

    if(carts.length!==0){
 return res.status(500).json({ status:false,message:"the product is alredy added"})
    }else{

    
    let cart=new Cart({
        productName:req.body.productName,
        images:req.body.images,
        rating:req.body.rating,
        price:req.body.price,
        Quantiy:req.body.Quantiy,
        subtotal:req.body.subtotal,
    productId:req.body.productId,
    userId:req.body.userId
  
    })
    cart=cart.save();
    if(!cart){
        res.status(500).json({message:"Something Wrong",status:false})
    }
    res.status(201).json(cart)
}
})
router.put("/:id", async (req, res) => {
    try {
        const cartId = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).json({ message: "Invalid ObjectId" });
        }

        // Convert to ObjectId
        const objectId = new mongoose.Types.ObjectId(cartId);

        // Check if cart exists
        const cart = await Cart.findById(objectId);
        if (!cart) {
            return res.status(404).json({ message: "The product does not exist" });
        }

        // Update Cart
        const updateCart = await Cart.findByIdAndUpdate(
            objectId,
            {
                productName: req.body.productName,
                images: req.body.images,
                rating: req.body.rating,
                price: req.body.price,
                Quantiy:req.body.Quantiy,
                subtotal: req.body.subtotal,
                productId: req.body.productId,
                userId: req.body.userId,
            },
            { new: true }
        );

        if (!updateCart) {
            return res.status(500).json({ message: "Some problem occurred" });
        }

        res.status(200).json({ message: "Updated Successfully", updateCart });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/usercart/:id",async (req,res) => {
    try {
        const cart=await Cart.find({userId:req.params.id});
        if(!cart){
            res.status(500).json({success:false, message:"There is no product"})
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message:err,success:false})
    }
})
// Delete Cart Route
router.delete("/:id", async (req, res) => {
    try {
        const cartId = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).json({ message: "Invalid ObjectId" });
        }

        const objectId = new mongoose.Types.ObjectId(cartId);

        const deletedCart = await Cart.findByIdAndDelete(objectId);
        if (!deletedCart) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;