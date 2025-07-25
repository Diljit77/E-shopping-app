import React, { useContext, useEffect, useState } from 'react'

import ProductZoom from '../../Components/ProductZoom'
import { Button, CircularProgress, Rating } from '@mui/material'

import { BsFillCartFill } from "react-icons/bs";

import { IoMdHeartEmpty } from 'react-icons/io'
import { MdCompareArrows } from 'react-icons/md'

import { useParams } from 'react-router-dom'
import { fetchDataFromApi, PostData } from '../../utils/api'
import { MyContext } from '../../App'
import QuantityDrops from '../../Components/QuantiyDrops'

function ProductDetail() {
    const context=useContext(MyContext);
    let [productQuantity,setproductQuantity]=useState(1)

    const [productdata,setProductData]=useState([]);
    const [ReviewData,setReviewData]=useState([])
    const [isLoading,setIsLoading]=useState(false);
    const [review,setreview]=useState({
        customerName:"",
        review:"",
    customerRating:0,
    productId:"",
    customerId:""

    });
    function formatDate(isoString) {
        const date = new Date(isoString);
        const options = { month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    const [rating,setrating]=useState(1)
    const {id}=useParams();
    const [Id,setId]=useState(id)
    const [activetabs, setActivetabs] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            fetchDataFromApi(`/api/product/${id}`).then((res)=>{
                setProductData(res);
                 }).catch((err)=>console.log(err))
          }, 2000);
          setTimeout(() => {
            fetchDataFromApi(`/api/review?productId=${id}`).then((res)=>{
                setReviewData(res)
            })
          }, 3000);
     
         

      
})
useEffect(()=>{
    setrating(context.rating);
},[context.rating])
const Quantity=(val)=>{
    setproductQuantity(val)
}
const changerating=(e)=>{
    setrating(e.target.value)
review.customerRating=e.target.value
}
const changeinput=(e)=>{
setreview(()=>({
    ...review,[e.target.name]:e.target.value
}))
console.log(review)

}
const addreview=(e)=>{
    e.preventDefault();
    setIsLoading(true)
    const user=JSON.parse(localStorage.getItem("user"));
    review.customerId=user?.userId
    review.productId=id;
    console.log(review)
    if(review.customerRating===0){
         setIsLoading(false)
       context.setalertbox({
        msg:"Please give the rating ",
   open:true,
   error:true,

})

return null;
    }
    if(review.customerName===""||review.review===""){
         setIsLoading(false)
              context.setalertbox({
        msg:"Please fill the required input ",
   open:true,
   error:true,

})

return null;
    }
if(!review.customerId){
    setIsLoading(false)
       context.setalertbox({
        msg:"Please Login for adding review",
   open:true,
   error:true,

})
return null;
    }
 if(review.customerId!==""){
    PostData("/api/review/add",review).then((res)=>{
        setIsLoading(false)
        
       
        fetchDataFromApi(`/api/review?productId=${id}`).then((res)=>{
            setReviewData(res)
        })
    // console.log("add",res)
    }).catch(err=>{
    
        context.setalertbox({
            msg:"Please Login for adding review",
       open:true,
       error:true,
    
     })
        setIsLoading(false)
        console.log(err)})
  }else{
    setIsLoading(false);
    context.setalertbox({
        msg:"Please Login for adding review",
   open:true,
   error:true,

 })


  }


 }  
 let [cart,setcart]=useState({})
 const addtocart=(data)=>{
    const user=JSON.parse(localStorage.getItem("user"));
  
      cart.productName=data?.name,
      cart.images=data?.images[0],
      cart.rating=data?.rating,
      cart.price=data?.price,
      cart.Quantiy=productQuantity,
      cart.subtotal=parseInt(data?.price*productQuantity),
    cart.productId=data?._id,
    cart.userId=user?.userId
  
context.addtocart(cart)
 }
  const addtomyList=(id)=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(!user){
        context.setalertbox({
            msg:"please Login",
        open:true,
        error:true,
        
        })
        return null;
    }
    if(user){
      const data={
        productName:productdata?.name,
        images:productdata?.images[0],
        rating:productdata?.rating,
        price:productdata?.price,
        productId:id,
        userId:user?.userId
      }
  PostData("/api/myList/add",data).then((res)=>{
  
   if(res.status ===true){
    context.setalertbox({
      msg:"Added Succesfully",
  open:true,
  error:false,
  
  })
  }
  
  if(res.status===false){
       context.setalertbox({
      msg:res.message,
  open:true,
  error:true,
  
  })
  }
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
        <>
            <section className="productDetails section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <ProductZoom images={productdata?.images} discount={productdata?.discount} />
                        </div>
                        <div className="col-md-7 mt-5">
                            <h2>{productdata?.name}</h2>
                            <ul className="list list-inline d-flex align-items-center">
                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <span className='text-light mr-2' >Brands :</span>
                                        <span>{productdata?.brand}</span>

                                    </div>
                                </li>
                                <li className="list-inline-item">
                                  
                                    <Rating name='read-only' value={3} precision={0.5} size='small' readOnly />
                          
                                    <span className='text-light cursor ml-2'> {ReviewData.length} Review</span>
                                </li>

                            </ul>
                            <div className="d-flex info mb-2" >
                                <span className="oldprice">${productdata?.price}.00</span>
                                <span className="netprice">$14.00</span>
                            </div>
                            <span className="badge bg-success">
                                In Stock
                            </span>
                            <p className="mt-2">{productdata?.description}</p>
                            <div className="d-flex align-items-center mt-2">
                                <QuantityDrops Quantity={Quantity}  />
                                <button  className='bg-blue btn-lg btn-round bg-big cart' onClick={()=>addtocart(productdata)} ><BsFillCartFill /> &nbsp; Add To Cart</button>


                            </div>
                            <div className="d-flex align-item-center actions">
                                <Button onClick={()=>addtomyList(id)} className="btn-round mt-3 btn-sml list" style={{ textTransform: "capitalize", borderRadius: "40px", color: "#000", borderColor: "#000" }} variant="outlined"><IoMdHeartEmpty />Add To Wishlist</Button>
                                <Button className="btn-round mt-3 btn-sml ml-3" style={{ textTransform: "capitalize", borderRadius: "40px", color: "#000", borderColor: "#000" }} variant="outlined"><MdCompareArrows />Compare</Button>
                            </div>
                        </div>
                    </div>
          
                    <br />
                    <div className="card mt-5 p-5 detailpageTabs">
                        <div className="customTabs">
                            <ul className="list  list-inline">
                                <li className="list-inline-item">
                                    <button className={`${activetabs === 0 && 'active'} descriptions`} onClick={() => setActivetabs(0)}>Description</button>
                                </li>
                                <li className="list-inline-item">
                                    <button className={`${activetabs === 1 && 'active'} addinfo`} onClick={() => setActivetabs(1)}>Additional Info</button>
                                </li>
                                <li className="list-inline-item">
                                    <button className={`${activetabs === 2 && 'active'} review`} onClick={() => setActivetabs(2)}>Review({ReviewData.length})</button>
                                </li>

                            </ul>
                            <br />
                            {
                                activetabs === 0 && <div className="tabContent">
                                    <p>{productdata?.description}</p>
                                </div>
                            }
                            {
                                activetabs === 1 && <div className="tabContent">
                                    <div className="table-respinsive">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr className='stand-up'>
                                                    <th>Stand Up</th>
                                                    <td>
                                            <p>35'L *24'W * 37-45'H(front to back wheel)</p>
                                                    </td>
                                                </tr>
                                                <tr className='stand-up'>
                                                    <th>Stand Up</th>
                                                    <td>
                                            <p>35'L *24'W * 37-45'H(front to back wheel)</p>
                                                    </td>
                                                </tr>
                                                <tr className='stand-up'>
                                                    <th>Stand Up</th>
                                                    <td>
                                            <p>35'L *24'W * 37-45'H(front to back wheel)</p>
                                                    </td>
                                                </tr>
                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                            {
                                activetabs===2 && <div className="tabContent">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h3>Reviews</h3>
                                            <br />

                                              {
                                                ReviewData.length!==0 && ReviewData?.map((item,index)=>{

                                                 return(
                                                    <div className="card mt-3 p-4 reviewsCard flex-row shadow" key={index}>
                                                        <div className="info pl-5">
                                                            <div className="d-flex aligns-items-center w-100">
                                                            <p className='mb-0'>{item?.customerName}</p>
                                                           
                                                                <div className="ml-auto">
                                                                    <Rating name='half-rating-read' value={item?.customerRating} precision={0.5} readOnly size="small" /> </div>
                                                            </div>
                                                          
                                                            <h6>{item?.review}</h6>
                                                            <p className='text-light'>{formatDate(item?.dataCreated)}</p>
                                                        </div>
                                                    </div>
                                                 )
                                                })
                                              }
                                            <form className='reviewForm'>
                                                <h3 className='mt-2'>Add a Review</h3>
                                                <div className="form-group">
                                                    <textarea id='review-input'  className='form-control' placeholder='Write a Review' onChange={changeinput}  name='review'></textarea>
                                                </div>
                                                <div className="row">
                                        <div className="col-md-6">
                                           
 <input type="text" id='customer-name' className='form-control shadow' name='customerName' placeholder='Name' onChange={changeinput} /></div>
                                       
                                        <div className="col-md-6">
                                            <div id='rating-wrapper' className="form-group">
                                                <Rating name='rating' id="star-rating"  value={rating} onChange={changerating}  />
                                            </div>
                                        </div>
                                        
                                                </div>
                                                <button id='submit-review' type='submit' onClick={addreview} className='bg-blue btn-lg btn-round bg-big '>
                                                    { isLoading===true?<CircularProgress /> :"Submit Review"}</button>
                                            </form>
                                                
                                                
                                        
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
          
                    <br />
         
                </div>
            </section>
        </>
    )
}


export default ProductDetail