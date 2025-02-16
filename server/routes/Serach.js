import express from "express"
const router = express.Router();
import Product from "../models/product.js";

router.get("/", async (req,res) => {
    try {
        const query=req.query.q
        if(!query){
            return res.status(400).json({msg:"Query is required"})
        }
        const item=await Product.find({
            $or:[
                {
                    name:{$regex:query,$options:"i"}
                },
                {
                    brand:{$regex:query,$options:"i"}
                },
                {
                    catName:{$regex:query,$options:"i"}
                }
            ]
        });
        res.json(item)
        
    } catch (error) {
        res.status(500).json({msg:"server error"})
        
    }
})



export default router;