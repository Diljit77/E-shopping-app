import React, { useRef } from 'react'
import { Badge, Dialog } from '@mui/material'
import { MdClose } from 'react-icons/md'
import { Rating } from '@mui/material'
import Slider from 'react-slick'
import InnerImageZoom from 'react-inner-image-zoom'
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css"
import { FaMinus } from "react-icons/fa"
import { FaPlus } from "react-icons/fa";
import QuantityDrop from './QuantityDrop'
import {Button} from '@mui/material'
import { IoMdHeartEmpty } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import ProductZoom from './ProductZoom'

import { PostData } from '../utils/api'
import { MyContext } from '../App'
import { useContext } from 'react'
import QuantityDrops from './QuantiyDrops'
function ProductModal(props) {
  const ZoomSliderBig = useRef();
  const context=useContext(MyContext);
  const ZoomSlider = useRef();
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
    ZoomSlider.current.slickGoTo(index);
    ZoomSliderBig.current.slickGoTo(index);
  }
   const addtomyList=(id)=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(user){
      const data={
        productName:props?.data?.name,
        images:props.data?.images[0],
        rating:props?.data?.rating,
        price:props?.data?.price,
        productId:id,
        userId:user?.userId
      }
  PostData("/api/myList/add",data).then((res)=>{
  
    context.setalertbox({
      msg:"Added Succesfully",
  open:true,
  error:false,
  
  })
  })
    }else{
      context.setalertbox({
        msg:"please Login",
    open:true,
    error:true,
    
    })
    }

  }
  return (
    <div>
      <Dialog open={true} className='productModal' onClose={() => props.closeProductModal()} >

        <button className='close_ ' onClick={() => props.closeProductModal()}><MdClose /></button>
        <h4 className='mb-1 mt-1'>{props?.data?.name}</h4>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center mr-4">
            <span>Brand:</span>
            <span className='ml-2 font'>{props?.data?.brand}</span>
          </div>
          <Rating name="read-only" value={5} size='small' precision={0.5} readOnly />


        </div>
        <hr />
        <div className="row mt-3 productDetailModal">
          <div className="col-md-5">
          <ProductZoom images={props?.data?.images} discount={props?.data?.discount}/>
            


          </div>
          <div className="col-md-7">
            <div className="d-flex info align-items-center mb-2">
              <span className='oldprice'>${props?.data?.price}.00</span>
              <span className="netprice text-danger">$14.00</span>
            </div>
            <span className="badge bg-success">In Stock</span>
            <p className="mt-2">{props?.data?.description}</p>
            <div className="d-flex align-items-center">
             <QuantityDrops />
              <button className='bg-blue btn-lg btn-round bg-big ml-3'>Add To Cart</button>
            </div>
            <div className="d-flex align-item-center actions">
            <Button onClick={()=>addtomyList(props?.data?._id)} className="btn-round mt-3 btn-sml" style={{textTransform:"capitalize",borderRadius:"40px"}} variant="outlined"><IoMdHeartEmpty />Add To Wishlist</Button>
            <Button className="btn-round mt-3 btn-sml ml-3" style={{textTransform:"capitalize",borderRadius:"40px"}} variant="outlined"><MdCompareArrows />Compare</Button>
            </div>
          </div>
        </div>


      </Dialog>
    </div>
  )
}

export default ProductModal
