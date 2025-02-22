
import express from "express"
const app=express();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import "dotenv/config"
import router  from "./routes/categories.js"
import ProductRoute from "./routes/product.js"
import SubcategoryRoute from './routes/subCats.js'
import UserRoute from "./routes/User.js"
import authJwt from "./helper/jwt.js";
import ReviewRoute from "./routes/Reviews.js"
import cartRoute from "./routes/Cart.js"
import MyRoute from "./routes/myList.js"
import SerachRoute from "./routes/Serach.js"
app.use(cors());
app.options('*',cors());
const port=process.env.port||process.env.PORT;
// middleware
app.use(bodyParser.json());

//Route
app.use("/api/category",router);
app.use("/api/product",ProductRoute);
app.use('/api/subcat',SubcategoryRoute);
app.use("/api/User",UserRoute);
app.use("/api/review",ReviewRoute);
app.use("/api/cart",cartRoute);
app.use("/api/myList",MyRoute);
app.use("/api/search",SerachRoute);
app.use(authJwt());
//monogdb

mongoose.connect(process.env.MONGO_DB_ATLAS,{
   

}).then(()=>{

    console.log("Database Connection is ready......")
}).catch((err)=>{
console.log(err)
})
app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})

