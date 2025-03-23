import React, { useEffect, useState } from 'react'
import HomeBanner from '../../Components/HomeBanner'
import Homeproducts from './Homeproducts'
import { MdOutlineEmail } from "react-icons/md";
import { fetchDataFromApi } from '../../utils/api';
import HomeCart from './HomeCart';

function Home() {
  const [catData,setCatData]=useState([]);
  const controller = new AbortController(); 
  const [featuredProducts,setFeaturedProducts]=useState([]);
  const [productsdata,setProductData]= useState([]);
useEffect(() => {
      if(catData.length===0){
        setTimeout(() => {
          if(catData.length===0){
            fetchDataFromApi("/api/category/",{signal:controller.signal}).then((res)=>{
          
              setCatData(res);
                }).catch((err) => {
                    if (err.name === "AbortError") {
                      console.log("Request aborted due to component unmount");
                    } else {
                      console.error("API Error:", err);
                    }
                  });
          }
       
         
        }, 2000);
            
                  return () => {
                    controller.abort(); // ✅ Cleanup: Cancel API request if component unmounts
                  };
         }
         setTimeout(() => {
          if(featuredProducts.length===0){
            fetchDataFromApi("/api/product/featured").then((res)=>{
              setFeaturedProducts(res)
            })
          }
          if(productsdata.length===0){
            fetchDataFromApi("/api/product?perPage=12&catName=Fashion").then((res)=>{
              setProductData(res);
            })
          }
        
         
        }, 2000);

})

  return (
    <div>
   <HomeBanner />{
    catData?.length!==0 &&  <HomeCart catData={catData} />
   }
  
   <Homeproducts featuredProducts={featuredProducts} productsdata={productsdata} catData={catData} />
   <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center ">
    <div className="container ">
      <div className="row d-flex align-items-center">
<div className="col-md-6   ">
<p className="text-white mb-1">$20 discount for first order</p>
<h3 className='text-white'>Join our newsletter and get.....</h3>
<p className='text-light'>Join our email subscription now to get updates <br /> on promotions and coupons</p>
<form >
  <MdOutlineEmail />
  <input type="text" placeholder='Your email address....' />
  <button>Subscribe</button>
</form>
</div>
<div className="col-md-6">
  <img src="https://fullstack-ecommerce.netlify.app/static/media/newsletter.5931358dd220a40019fc.png" alt="" />
  
</div>
</div>
    </div>
   </section>
    </div>
  )
}

export default Home
