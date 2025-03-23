import express from "express"
const router = express.Router();
import Order from "../models/Order.js";
router.get("/",async (req,res) => {
    const Page=parseInt(req.query.page)||1;
    const perPage=parseInt(req.query.perPage);
    const totalPosts=await Order.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);
    if(Page>totalPages){
        return res.status(404).json({message:" Page Not Found"})
    }
    const orderList=await Order.find().skip((Page-1)*perPage).limit(perPage).exec();
    if(!orderList){
        res.status(500).json({success:false})
    }
    return res.status(200).json({
        "orderList":orderList,
        "totalpages":totalPages,
        "page":Page
    })
})
router.get("/userorder/:id",async (req,res) => {
    try {
        const order=await Order.find({userid:req.params.id});
        if(!order){
            return res.status(404).json({message:"No Order found"});
        }
        return res.status(200).json({
            "orderList":order,
            "totalpages":totalPages,
            "page":Page
        })
    } catch (error) {
        
    }
   

})
router.get("/:id",async (req,res) => {
    const order=await Order.findById(req.params.id);
    if(!order){
        res.status(500).json({message:"The Order with the given ID was not found"})
    }
    return res.status(200).send(order)
})
router.post("/create",async (req,res) => {
    try {
        let order=new Order({
            name:req.body.name,
            phonenumber:req.body.phonenumber,
            address:req.body.address,
            pincode:req.body.pincode,
            amount:req.body.amount,
        paymentId:req.body.paymentId,
        email:req.body.email,
        userid:req.body.userid,
        products:req.body.products,
    })
    if(!order){
        res.status(500).json({
            error:"something Went Wrong",
            success:false
        })
    
    }
    order=await order.save();
    res.status(201).json(order)
    } catch (error) {
        console.log(error)
    }
 
 


})
router.delete("/:id",async (req,res) => {
    const deleteorder=await Order.findByIdAndDelete(req.params.id);
    if(!deleteorder){
        res.status(401).json({
            message:"Order not found",
            success:false
        })
    }
    res.status(200).json({
        success:true,
        message:"Order deleted"
    })
})


export default router;
