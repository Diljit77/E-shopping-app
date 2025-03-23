import React, { useEffect, useRef, useState } from 'react'
import { Rating } from '@mui/material'
import { AiOutlineFullscreen } from 'react-icons/ai'
import { IoIosHeartEmpty } from 'react-icons/io'

import ProductModal from '../../Components/ProductModal'
import { fetchDataFromApi, PostData } from '../../utils/api'
import { Link } from 'react-router-dom'
import { MyContext } from '../../App';
import { useContext } from 'react'
function ProductItem(props) {
    const context=useContext(MyContext);
  const [isHovered,setIsHovered]=useState(false)
  const [productData,setProductData]=useState([]);
  const [mylistfield,setmyListfield]=useState([]);
  const slideref=useRef();
  var settings={
    dots:true,
    infinite:true,
    loop:true,
    speed:300,
    slidesToShow:1,
    slidesToScroll:1,
    autoplay:true,
  }

  const [isOpenProductModal,setisOpenProductModal]=useState({
    id:'',
    open:false,
  })
  const viewProductdetails=(id)=>{
    console.log(id);
setisOpenProductModal({
  id:id,
  open:true
});
  }
  useEffect(() => {
    setTimeout(() => {
      fetchDataFromApi(`/api/product/${isOpenProductModal.id}`).then((res)=>{
        setProductData(res);
        
  
      }).catch((err)=>console.log(err))
    }, 2000);
 
  
    
  }, [isOpenProductModal]);
  
  const closeProductModal=()=>{
    setisOpenProductModal({
      id:"",
      open:false,
    });  
  }
  const handleMouseEnter=()=>{
    setIsHovered(true);
    setTimeout(()=>{
      if(slideref.current){
        slideref.current.slickPlay();
      }
    })
  }
  const handleMouseLeave=()=>{
    setIsHovered(true);
    setTimeout(()=>{
      if(slideref.current){
        slideref.current.slickPause();
      }
    })
  }
  const addtomyList=(id)=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(user){
      const data={
        productName:props?.item?.name,
        images:props.item?.images[0],
        rating:props?.item?.rating,
        price:props?.item?.price,
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
    <div className={`productitem item ${props.itemView}` } onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
    <div className="imgWrapper">
  <Link to={`/product/${props?.item?._id}`}><img src={props.item?.images[0]} className='w-100 IMG' alt="" /></Link>  

<span className='badge badge-primary'>{props?.item?.discount}%</span>
<div className="actions">
<button onClick={()=>viewProductdetails(props?.item?._id)}><AiOutlineFullscreen/></button>
<button onClick={()=>addtomyList(props?.item?._id)}><IoIosHeartEmpty/></button>
</div>
    </div>
    <div className="info">
    <h4>{props?.item?.name?.substr(0,30)+"....."}</h4>
    <span className='text-success d-block'>In Stock</span>
    <Rating name="read-only" value={props?.item?.rating} readOnly />
   
    <div className="d-flex">
        <span className='oldprice'>${props?.item?.price}.00</span>
        <span className='netprice text-danger ml-2'>$14.00</span>
    </div>
</div>
{
  isOpenProductModal.open === true && <ProductModal data={productData} closeProductModal={closeProductModal} />
}
</div>

  )
}

export default ProductItem
