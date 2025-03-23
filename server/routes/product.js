import express from "express"
const router = express.Router();
import Product from "../models/product.js";
import plimit from "p-limit"
import Category from "../models/category.js";
import cloudinary from "cloudinary"

cloudinary.v2;


router.get("/", async (req, res) => {
    const Page=parseInt(req.query.page)||1;
    const perPage=parseInt(req.query.perPage);
    const totalPosts=await Product.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);
    if(Page>totalPages){
        return res.status(404).json({message:" Page Not Found"})
    }
let ProductList=[];
if(req.query.minPrice!==undefined && req.query.maxPrice!==undefined){
    ProductList=await Product.find({subcatId:req.query.subcatId}).populate("category subCat");
    const filterProducts=ProductList.filter(product=>{
        if(req.query.minPrice&& product.price<parseInt(req.query.minPrice)){
 return false;
        }
        if(req.query.maxPrice && product.price > parseInt(req.query.maxPrice)){
            return false;
                   }
                   return true

    })
    if(!ProductList){
        res.status(500).json({success:false})
    }
    return res.status(200).json({
        "products":filterProducts,
        "totalPages":totalPages,
        "page":Page
    })
}else if   (req.query.catName!==undefined) {

ProductList=await Product.find({catName:req.query.catName}).populate("category subCat")
if (!ProductList) {
    res.status(500).json({ success: false })
}
res.send(ProductList)  

}else{
    ProductList=await Product.find(req.query).populate("category subCat");
        
            if (!ProductList) {
                res.status(500).json({ success: false })
            }
            res.send(ProductList)  
}


})
router.get("/featured",async (req,res) => {
    const ProductList=await Product.find({isfeatured:true});
    if(!ProductList){
        res.status(500).json({success:false,message:"not exist"})
    }
    return res.status(200).json(ProductList)


    
})
router.get("/:id",async (req,res) => {
    const product=await Product.findById(req.params.id);
    if(!product){
       return res.status(402).json({message:"the id is not exist"})
    }
    return res.status(200).json(product)

})

router.post("/create", async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(404).send("Invalid category")
    }
    const limit = plimit(2);
    const imagetoUpload = req.body.images.map((image) => {
        return limit(async () => {

            const result = await cloudinary.uploader.upload(image)
            // console.log(image)
            return result;
        });
    });
    const uploadstatus = await Promise.all(imagetoUpload);
    const imgURl = uploadstatus.map((item) => {
        return item.secure_url
    });
    if (!uploadstatus) {
        return res.status(500).json({
            error: "image is not found",
            status: false
        })
    }

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        price: req.body.price,
        images: req.body.images,
        category: req.body.category,
        countInStock: req.body.countInStock,
        isfeatured:req.body.isfeatured,
        catName:req.body.catName,
    subcatId:req.body.subcatId,
        subCat:req.body.subCat,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        discount:req.body.discount,
        productRam:req.body.productRam,
        productSize:req.body.productSize,
        productWeight:req.body.productWeight

    });
    product = await product.save();
    if (!product) {
        res.status(500).json({
            error: err,
            success: false

        })
    }
    res.status(201).json(product)
})
router.delete("/:id", async (req, res) => {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
        return res.status(404).json({
            message: "Product Not Found",
            success: false
        })

    }
    res.status(201).send({
        message: "the product is deleted"
    })
})
router.put("/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            description: req.body.description,
            brand: req.body.brand,
            price: req.body.price,
            images: req.body.images,
            category: req.body.category,
            countInStock: req.body.countInStock,
            isfeatured:req.body.isfeatured,
            catName:req.body.catName,
            subcatId:req.body.subcatId,
            subCat:req.body.subCat,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            discount:req.body.discount,
            productRam:req.body.productRam,
            productSize:req.body.productSize,
            productWeight:req.body.productWeight,
            
    
        } , {
        new: true
    }
    )
    if (!product) {
        res.status(404).json({
            message: "the Product is not updated",
            success: false
        })

    }
    res.status(200).json(
        {
            message: "The product is updated",
            success: true
        }
    )

})
router.get("/category/:id",async (req,res) => {
    try{
     
    const product=await Product.find({category:req.params.id});
    if(!product){
    return res.status(404).json({success:false,message:"no product exists"})
    }
    res.send(product);
}catch(err){
    console.log(err)
    res.status(500).json({success:false,message:"something went wrong"})
}
})
export default router;
