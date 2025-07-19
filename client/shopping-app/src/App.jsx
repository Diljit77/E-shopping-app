import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Header from "./Components/Header"
import { createContext, useEffect, useRef, useState } from "react"
import axios from "axios"
import Footer from "./Components/Footer"
import Listing from "./Pages/Listing/Listing"
import ProductDetail from "./Pages/ProductDetails/ProductDetail"
import Cart from "./Pages/Cart/Cart"
import SignIn from "./Pages/signIn/SignIn"
import Signup from "./Pages/signIn/Signup"
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import { deleteData, fetchDataFromApi, PostData } from "./utils/api"
import WIshList from "./Components/myList/myList"
import Checkout from "./Pages/Checkout/Checkout"
import Search from "./Pages/Search/Search"
import Account from "./Pages/Account/Acount"
import VerifyOtp from "./Pages/signIn/VerifyOtp"
import Changepassword from "./Pages/signIn/Changepassword"
import Orders from "./Pages/Order/Orders"
import Listingbycategory from "./Pages/Listing/Listingbycategory"
import EditReview from "./Pages/Account/EditReview"
import VoiceAssistant from "./Components/Voiceasistent"

const MyContext=createContext();

function App() {
  const [cartdata,setCartdata]=useState([])
  const [searchData,setsearchData]=useState([]);
   const [rating,setrating]=useState(1)
  const [showResults, setShowResults] = useState(false);
  const [IsLogin,setIsLogin]=useState(false);
 const [mylistdata,setmylistdata]=useState([])

  const [searchfield, setsearchfield] = useState('');
const [Productdata, setProductData] = useState([]);
  const [featuredProductsdata,setFeaturedProductsdata]=useState([]);
    const [countryList,setCountryist]=useState([]);
  useEffect(()=>{
    setTimeout(() => {
      getcountry("https://countriesnow.space/api/v0.1/countries/");
    }, 3000);

  },[]);

    
  const getcountry= async (url)=>{
    const response=await axios.get(url).then((res)=>{

setCountryist(res.data.data);
    })
  }
const [user,setuser]=useState({
name:"",
email:"",
userId:""
})

const addtocart=(data)=>{
  
  const user=JSON.parse(localStorage.getItem("user"));
  if(!user){
    setalertbox({
        msg:"please Login",
    open:true,
    error:true,
    
    })
    return null;
}
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
  
  const searchFromVoice = (query) => {
    setsearchfield(query);
    if (query !== "") {
      fetchDataFromApi(`/api/search?q=${query}`).then((res) => {
        setsearchData(res);
        setShowResults(true);
      });
    } else {
      setsearchData([]);
      setShowResults(false);
    }
  };
  const [isHeaderFooter,setisHeaderFooter]=useState(true)
  const [alertbox,setalertbox]=useState({
    msg:"please fill",
    error:false,
    open:false
  });
  const assistantRef = useRef();

  const triggerAssistantManually = () => {
    if (assistantRef.current) {
      assistantRef.current.startManualListening();
    }
  };

  
const addtomyList=(id,bestMatch)=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(user){
      const data={
        productName:bestMatch.name,
        images:bestMatch.images[0],
        rating:bestMatch.rating,
        price:bestMatch.price,
        productId:id,
        userId:user?.userId
      }
  PostData("/api/myList/add",data).then((res)=>{
  
  setalertbox({
      msg:"Added Succesfully",
  open:true,
  error:false,
  
  })
  })
    }else{
      setalertbox({
        msg:"please Login",
    open:true,
    error:true,
    
    })
    }

  }
  const removemetocart=(id)=>{
  deleteData(`/api/cart/${id}`).then((res)=>{
      setalertbox({
          msg:"Item removed from cart",
     open:true,
     error:false,
  
   })
  
  
  }).catch((err)=>{
      setalertbox({
          msg:"Somehting went wrong",
     open:true,
     error:true,
  
   })
  })
  }
  const removemylist=(id)=>{
  deleteData(`/api/myList/${id}`).then((res)=>{
      setalertbox({
          msg:"Item removed from wishlist",
     open:true,
     error:false,
  
   })
 
  
  }).catch((err)=>{
      setalertbox({
          msg:"Somehting went wrong",
     open:true,
     error:true,
  
   })
  })
  }
  const value={
    setCountryist,countryList,
    isHeaderFooter,
    setisHeaderFooter,
    addtomyList,
    alertbox,
    setalertbox,
    IsLogin,
    setIsLogin,
    addtocart,
    mylistdata,
    setmylistdata,
    cartdata,
    setCartdata,
    removemetocart,
    removemylist,
    searchData,
    setsearchData,
    Productdata,
    setProductData,
    showResults,
    setShowResults,
    searchfield,
    setsearchfield
, searchFromVoice ,
featuredProductsdata,setFeaturedProductsdata,
rating,setrating }
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
      isHeaderFooter===true && <Header onMicClick={triggerAssistantManually} />
    }
    <Snackbar open={alertbox.open} autoHideDuration={6000} oncClose={handleclose}  >
      <Alert onClose={handleclose} severity={alertbox.error===false?"success":"error"}
      variant="filled" sx={{width:"100%"}} >
     {alertbox.msg} 
      </Alert>

    </Snackbar>
    
    <VoiceAssistant ref={assistantRef}  />
      <Routes >
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/subcat/:id" exact={true} element={<Listing />} />
        <Route path="category/:id" exact={true} element={<Listingbycategory />} />
        <Route path="/product/:id" exact={true} element={<ProductDetail />} />
        <Route path="/cart" exact={true} element={<Cart />} />
        <Route path="/signin" exact={true} element={<SignIn />} />
        <Route path="/signup" exact={true} element={<Signup />} />
        <Route path="/changepassword" exact={true} element={<Changepassword />} />
        <Route path="/verify" exact={true} element={<VerifyOtp />} />
        <Route path="/myList" exact={true} element={<WIshList />} />
        <Route path="/checkout" exact={true} element={<Checkout />} />
        <Route path="/search" exact={true} element={<Search />} />
        <Route path="/myaccount" exact={true} element={<Account />} />
        <Route path="/myaccount/editreview/:id" exact={true} element={<EditReview />} />
        <Route path="/orders" exact={true} element={<Orders />} />
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
