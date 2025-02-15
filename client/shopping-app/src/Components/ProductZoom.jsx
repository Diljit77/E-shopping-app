import React, { useState } from 'react';
import  { useRef } from 'react'
import InnerImageZoom from 'react-inner-image-zoom'
import Slider from 'react-slick'
import { SwiperSlide } from 'swiper/react';
 

function ProductZoom(props) {
  const [slideIndex,setslideINdex]=useState(0);
      const ZoomSlider = useRef();
        const ZoomSliderBig = useRef();
  var setting = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    arrows: true
  }
  var setting2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    fade: false,
    slidesToScroll: 1,
    arrows: false
  }
  const goto = (index) => {
    setslideINdex(index)
    ZoomSlider.current.slickGoTo(index);
    ZoomSliderBig.current.slickGoTo(index);
  }
  return (
   <>
     <div className="productZoom" style={{position:"relative"}}>
              <div className="badge badge-primary">{props?.discount}%</div>
              <Slider {...setting2} className='zoomSliderBig' ref={ZoomSliderBig} >
            {
              props?.images?.map((item,index)=>{
                return(
                  <SwiperSlide key={index}>
                  <div className="item mt-2">
                  <InnerImageZoom className='IMGS w-100' zoomType='hover' zoomScale={1} src={item} />
                </div>
                </SwiperSlide>
                )
              })
            }
              </Slider>
            
            <Slider {...setting} className='zoomSlider' ref={ZoomSlider}>
            {
              props?.images?.map((item,index)=>{
                return(
                  <SwiperSlide key={index}>
                 <div className={`item ${slideIndex===index && 'item_active'}`} key={index}>
                  <img src={item} className='w-100'onClick={()=>goto(index)} alt="" />
                 </div>
                </SwiperSlide>
                )
              })
            }        
      
            </Slider>
            </div>
   </>
  )
}

export default ProductZoom
