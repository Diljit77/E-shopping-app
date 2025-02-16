import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';


function HomeCart(props) {
      const [catData,setCatData]=useState([]);
      useEffect(() => {
        
      setCatData(props.catData)
    
      })
      
    return (
        <div className="homecat">
            <div className="container">
                <h3 className='mb-4 hd'>Featuered Catagories</h3>
                <Swiper
                    slidesPerView={10}
                    spaceBetween={5}
                    navigation={true}
                   slidesPerGroup={1}
                    modules={[Navigation]}
                    className="mySwiper" >
                     
                        {  Array.isArray(catData) &&
                            props?.catData?.length!==0 && props?.catData.map((Cat,index)=>{
                                return (
                                    <SwiperSlide key={index}>
                                        <Link to={`/products/category/${Cat.id}`}>
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
