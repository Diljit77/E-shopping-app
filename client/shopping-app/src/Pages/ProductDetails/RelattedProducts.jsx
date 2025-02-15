import React from 'react'
import Swiper from 'swiper'
import { SwiperSlide } from 'swiper/react'
import ProductItem from '../Home/ProductItem'
import { MdOutlineArrowForward } from 'react-icons/md'
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'




function RelattedProducts(props) {
    return ( 
      <>
       <div className="d-flex align-items-center">
                                  <div className="info w-75">
                                      <h3 className='hd mb-0'>BEST SELLERS</h3>
                                      <p className='text-light'>Do not miss the current offers</p>
                                  </div>
                                  <button className='viewallbtn ml-auto'>View All <MdOutlineArrowForward /> </button>
  
                              </div>
                              <div className="product_row">
                                  <Swiper
                                      slidesPerView={4}
                                      spaceBetween={0}
                                      pagination={{
                                          clickable: true,
                                      }}
                                      modules={[Navigation]}
                                      className="mySwiper" >
                                      <SwiperSlide >
                                          <ProductItem />
                                      </SwiperSlide >
                                      <SwiperSlide>
                                          <ProductItem />
                                      </SwiperSlide >
                                      <SwiperSlide >
                                          <ProductItem />
                                      </SwiperSlide >
                                      <SwiperSlide >
                                          <ProductItem />
                                      </SwiperSlide >
                                      <SwiperSlide >
                                          <ProductItem />
                                      </SwiperSlide >
                                      <SwiperSlide >
                                          <ProductItem />
                                      </SwiperSlide >
                                  </Swiper>
                              </div>
                              </>
  
    )
  }

export default RelattedProducts

