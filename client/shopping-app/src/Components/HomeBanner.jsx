import React from 'react'
import Slider from 'react-slick'

function HomeBanner() {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false
      };
  return (
    
     
     <div className="container mt-3">
        <div className="homebannersection">
     <Slider {...settings}>
       <div className='item'> 
      <img src="https://cmsimages.shoppersstop.com/Wedding_Ecom_Banner_Web_2544_X_740_Pxl_6d85c92d98/Wedding_Ecom_Banner_Web_2544_X_740_Pxl_6d85c92d98.jpg" className='w-100' alt="" />
   </div>
   <div className='item'> 
      <img src="https://cmsimages.shoppersstop.com/U_spa_web_3264e50089/U_spa_web_3264e50089.png" className='w-100' alt="" />
    </div>
    <div className='item'> 
      <img src="https://cmsimages.shoppersstop.com/U_spa_web_3264e50089/U_spa_web_3264e50089.png" className='w-100' alt="" />
    </div>
 </Slider>
     </div>
    
     </div>
  )
}

export default HomeBanner
