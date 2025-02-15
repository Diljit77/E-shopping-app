import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Header from "./Components/Header"
import { createContext, useEffect, useState } from "react"
import axios from "axios"
import Footer from "./Components/Footer"
import Listing from "./Pages/Listing/Listing"
import ProductDetail from "./Pages/ProductDetails/ProductDetail"
import Cart from "./Pages/Cart/Cart"
import SignIn from "./Pages/signIn/SignIn"
import Signup from "./Pages/signIn/Signup"
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import { PostData } from "./utils/api"
import WIshList from "./Components/myList/myList"
import Checkout from "./Pages/Checkout/Checkout"

const MyContext=createContext();

function App() {
  const [cartdata,setCartdata]=useState([])
  const [IsLogin,setIsLogin]=useState(false)
const [user,setuser]=useState({
name:"",
email:"",
userId:""
})

const addtocart=(data)=>{
  
 PostData("/api/cart/add",data).then((res)=>{
  if(res.status!==false){
    if(res!==null && res!==undefined && res!==""){
      console.log(res)
      setalertbox({
        open:true,
        error:false,
        msg:"Item is added to product cart"
      })
    }
  }
  else{
    setalertbox({
      open:true,
      error:true,
      msg:"item is already added"
    })
    
  }
 
 }).catch((err)=> {
  console.log(err)
  setalertbox({
  open:true,
  error:true,
  msg:"item is already added"
})})

  console.log(data)
}
  useEffect(() => {
   const token=localStorage.getItem("token");
   if(token!=="" && token!==undefined && token!==null){
setIsLogin(true);
const userData=JSON.parse(localStorage.getItem("user"));
   }else{
    setIsLogin(false)
   }
  
    
  })
  

  const [isHeaderFooter,setisHeaderFooter]=useState(true)
  const [alertbox,setalertbox]=useState({
    msg:"please fill",
    error:false,
    open:false
  });
  const value={
    isHeaderFooter,
    setisHeaderFooter,
    alertbox,
    setalertbox,
    IsLogin,
    setIsLogin,
    addtocart,
    cartdata,
    setCartdata
  }
  const handleclose=(event,reason)=>{
    if(reason==="clickaway"){
      return ;
    }
    setalertbox({
      open:false
    });
  }

  return (   <>   
    <BrowserRouter>
    <MyContext.Provider value={value} >
  
    {
      isHeaderFooter===true && <Header />
    }
    <Snackbar open={alertbox.open} autoHideDuration={6000} oncClose={handleclose}  >
      <Alert onClose={handleclose} severity={alertbox.error===false?"success":"error"}
      variant="filled" sx={{width:"100%"}} >
     {alertbox.msg} 
      </Alert>

    </Snackbar>
    
    
      <Routes >
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/subcat/:id" exact={true} element={<Listing />} />
        <Route path="category/:id" exact={true} element={<Listing />} />
        <Route path="/product/:id" exact={true} element={<ProductDetail />} />
        <Route path="/cart" exact={true} element={<Cart />} />
        <Route path="/signin" exact={true} element={<SignIn />} />
        <Route path="/signup" exact={true} element={<Signup />} />
        <Route path="/myList" exact={true} element={<WIshList />} />
        <Route path="/checkout" exact={true} element={<Checkout />} />
      </Routes>
      {
        isHeaderFooter===true && <Footer />
      }
     </MyContext.Provider> 
      </BrowserRouter>
  
    </>
  )
}
export { MyContext};


export default App;
