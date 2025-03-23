import React, { useEffect, useState } from 'react'
import { MdOutlineArrowForward } from "react-icons/md";
import Rating from '@mui/material/Rating';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { AiOutlineFullscreen } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import ProductItem from './ProductItem';
import HomeCart from './HomeCart';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { fetchDataFromApi } from '../../utils/api';
import { CircularProgress } from '@mui/material';

function Homeproducts(props) {
    const [catData, setCatData] = useState([])
    const [value, setValue] = useState(0);
    const [Cat,setCat]=useState('Fashion')
    const [selectcat,setselectCat]=useState('')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const selectCat=(cat)=>{
        setselectCat(cat)
        setCat(cat)
      //  console.log(Cat);

    }
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [Productdata, setProductData] = useState([])
    
    useEffect(() => {
        setTimeout(() => {
            fetchDataFromApi(`/api/product?perPage=12&catName=${Cat}`).then((res)=>{
                setProductData(res);
          
              })
              setFeaturedProducts(props.featuredProducts)
        
              setCatData(props.catData)
          }, 3000);
        
         

       

    })

    return (
        <div>

            <section className='homeproducts'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="sticky">
                                <div className="banner">
                                    <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/banner-box.jpg" alt="" className="cursor" />
                                </div>

                                <div className="banner mt-4">
                                    <img src="https://api.spicezgold.com/download/file_1734525757507_NewProject(34).jpg" alt="" className="cursor" />
                                </div>
                            </div>       </div>
                        <div className="col-md-9 productRow">
                            <div className="d-flex align-items-center">
                                <div className="info w-75">
                                    <h3 className='hd mb-0'>Popular Products</h3>
                                    <p className='text-light'>Do not miss the current offers</p>
                                </div>
                                <div className="ml-auto w-75">
                                    <Tabs value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto" >
                                        { Array.isArray(catData) &&
                                            catData?.length !== 0 && catData?.map((item, index) => {
                                                return (
                                                    <Tab key={index} label={item.name} onClick={()=>selectCat(item.name)} />
                                                )

                                            })
                                        }
                                       


                                    </Tabs>
                                </div>
                                {/**/}

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
                                  
                                    { Array.isArray(Productdata) &&
                                         Productdata?.length !== 0 && Productdata?.map((item, index) => {
                                            return (
                                                <SwiperSlide >
                                                    <ProductItem key={index} item={item} />
                                                </SwiperSlide >
                                            )
                                        })
                                    }
                                    {
                                        Productdata.length===0 && <CircularProgress />
                                    }
                                </Swiper>
                            </div>
                            <div className="d-flex align-items-center mt-5">
                                <div className="info w-75 ">
                                    <h3 className='hd mb-0'>New Products</h3>
                                    <p className='text-light'>Do not miss the current offers</p>
                                </div>

                                <button className='viewallbtn ml-auto'>View All <MdOutlineArrowForward /> </button> 
                            </div>
                            <div className="product_row productRow-2 w-100 mt-4 d-flex">
                             
                                {     Array.isArray(featuredProducts) &&
                                    featuredProducts?.length !== 0 && featuredProducts?.map((item, index) => {
                                        return (

                                            <ProductItem key={index} item={item} />

                                        )
                                    })
                                }
                                {
                                    featuredProducts.length===0 && <CircularProgress />
                                }

                            </div>
                            <div className="d-flex mt-4 mb-5 bannerSec">
                                <div className="banner ">
                                    <img src="https://api.spicezgold.com/download/file_1734525868575_banner-9.jpg" alt="" />
                                </div>
                                <div className="banner ">
                                    <img src="https://api.spicezgold.com/download/file_1734525879105_banner-7.jpg" alt="" />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </section>
        </div>
    )
}

export default Homeproducts
