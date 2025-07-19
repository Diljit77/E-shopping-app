import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
function HomeCart(props) {
      const [catData,setCatData]=useState([]);
      const controller = new AbortController(); 
      useEffect(() => {
        if(catData.length===0){
          setTimeout(() => {
            fetchDataFromApi("/api/category/",{signal:controller.signal}).then((res)=>{
              // console.log(res);
           setCatData(res);
             }).catch((err) => {
                 if (err.name === "AbortError") {
                   console.log("Request aborted due to component unmount");
                 } else {
                   console.error("API Error:", err);
                 }
               });
          }, 2000);
          
                 return () => {
                   controller.abort(); // ✅ Cleanup: Cancel API request if component unmounts
                 };
        }
    
    //     fetchDataFromApi("/api/category/",{signal:controller.signal}).then((res)=>{
    //      // console.log(res);
    //   setCatData(res);
    //     }).catch((err) => {
    //         if (err.name === "AbortError") {
    //           console.log("Request aborted due to component unmount");
    //         } else {
    //           console.error("API Error:", err);
    //         }
    //       });
    //       return () => {
    //         controller.abort(); // ✅ Cleanup: Cancel API request if component unmounts
    //       };
      },[catData],30000)
      
    return (
        <div className="homecat">
            <div className="container" id='second-navbar'>
                <h3 className='mb-4 hd'>Featuered Catagories</h3>
                <Swiper
                    slidesPerView={10}
                    spaceBetween={5}
                    navigation={true}
                   slidesPerGroup={1}
                    modules={[Navigation]}
                    className="mySwiper"  id='second-navbar'>
                     
                        { Array.isArray(catData) &&
                            props?.catData?.length!==0 && props?.catData.map((Cat,index)=>{
                                return (
                                    <SwiperSlide key={index}>
                                        <Link to={`/category/${Cat.id}`} style={{textDecoration:"none",color:"#000"}} >
                                        <div className="item text-center cursor" style={{background:Cat.color}}>
                                            <img src={Cat.images[0]} alt="" />
                                            <h6>{Cat.name}</h6>
                                        </div>
                                        </Link>
                                    </SwiperSlide>
                                )
                            })
                        }
                   
           
                       </Swiper >

            </div>
        </div>
    )
}

export default HomeCart
