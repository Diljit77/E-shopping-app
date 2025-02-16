
import { Rating } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import QuantityDrop from '../../Components/QuantityDrop'
import { IoMdClose } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';

function Cart() {
    const context=useContext(MyContext);
    const [cartdata,setcartdata]=useState([]);
    const [productQuantity,setproductQuantity]=useState();
    const [updateQuantity,setupdateQuantity]=useState(0)
    const [cartfielddata,setcartfielddata]=useState({})
    const [changeQuantity,setchangeQuantity]=useState(0)
    useEffect(() => {
      
    fetchDataFromApi("/api/cart").then((res)=>{
        setcartdata(res);
      

    })
  
    })
    const Quantity=(val)=>{
        setproductQuantity(val)
        
     setchangeQuantity(val)
     console.log(val)
      
    }
   const selecteditem=(item,val)=>{
    if(changeQuantity!==0){
        const user=JSON.parse(localStorage.getItem("user"));
        let token=(localStorage.getItem("token"));
     
       
  cartfielddata.productName=item?.productName,
cartfielddata.images=item?.images,
cartfielddata.rating=item?.rating,
cartfielddata.price=item?.price,
cartfielddata.Quantiy=val,
cartfielddata.subtotal=parseInt(item?.price*val),
cartfielddata.productId=item?._id,
cartfielddata.userId=user?.userId
editData(`/api/cart/${item?._id}`,cartfielddata).then()
.catch(err=>console.log(err))
    }
    setupdateQuantity(val)
  //  console.log(val)
//console.log(item)






   }

    
const reoveme=(id)=>{
deleteData(`/api/cart/${id}`).then((res)=>{
    context.setalertbox({
        msg:"Item removed from cart",
   open:true,
   error:false,

 })
 fetchDataFromApi("/api/cart").then((res)=>{
    setcartdata(res);
  

})

}).catch((err)=>{
    context.setalertbox({
        msg:"Somehting went wrong",
   open:true,
   error:true,

 })
})
}



    return (
        <section className="section cartPage">
            <div className="container">
            <h2 className="hd mb-0">
                        Your Cart
                    </h2>
                    <p>There <b>{cartdata.length}</b> Products in your Cart</p>
                <div className="row d-flex">
                  
                    <div className="col-md-8">

                        <div className="table-responsive">
                            <table className='table'>
                                <thead> <tr>
                                    <th width="50%" className='ml-6' >Product</th>
                                    <th width="15%">Unit Price</th>
                                    <th width="20%">Quantity</th>
                                    <th width="10%" >Subtotal</th>
                                    <th width="15%">Remove</th>
                                </tr></thead>
                                <tbody>
                                    {   Array.isArray(cartdata) &&
                                    cartdata.length!==0 && Array.isArray(cartdata) && cartdata?.map((item,index)=>{
                                        return(

                                        
                                    <tr key={index}>
                                    <td width="40%"> <Link to={`/product/${item?._id}`} >
                                        <div className="d-flex align-items-center Cartitem">
                                            {/* <div className="imgWrapper">
                                            <img src={item?.images} alt="" className="w-100" />
                                            </div> */}
                                            <div className="info px-3">
                                                <h6>{item?.productName}</h6>
                                                <Rating name='read-only' value={item?.rating} precision={0.5} readOnly size='small' />
                                            </div>
                                        </div>
                                    </Link></td>
                                    <td width="15%">${item?.price}.00</td>
                                    <td width="20%"><QuantityDrop Quantity={Quantity}  setchangeQuantity={setchangeQuantity} value={item?.Quantiy} item={item} selecteditem={selecteditem}/></td>
                                    <td width="10%">${item?.subtotal}.00

                                    </td>
                                    <td width="15%"><span className='remove' onClick={()=>reoveme(item?._id)} ><MdDeleteForever /></span></td>
                                </tr>
                                        )

                                })
                            }
                                    
                                 
                                   
                                  
                                </tbody>
                            </table>
                        </div>
                       
                    </div>
                    <div className="col-md-4 pr-5">
                            <div className="card shadow p-3 cartDetails">
            <h4 className='mb-2 pb-2'>Cart Total</h4>
            <div className="d-flex align-items-center mb-2" style={{borderBottom:"1px solid rgba(0,0,0,0.1)",paddingBottom:"5px"}}>
                <span>Subtotal</span>
                <span className='ml-auto '><b>$
                    { Array.isArray(cartdata) &&
  cartdata.length!==0 && cartdata.map((item)=>   parseInt(item?.price)*item?.Quantiy).reduce((total,value)=>total+value,0)

}.00</b></span>
            </div>
            <div className="d-flex align-items-center mb-2"style={{borderBottom:"1px solid rgba(0,0,0,0.1)",paddingBottom:"5px"}}>
                <span>Shipping</span>
                <span className='ml-auto '><b>Free</b></span>
            </div>
            <div className="d-flex align-items-center mb-2"style={{borderBottom:"1px solid rgba(0,0,0,0.5)",paddingBottom:"5px"}}>
                <span>Estimate for</span>
                <span className='ml-auto'><b>Chandigarh</b></span>
            </div>
            <div className="d-flex align-items-center mb-2">
                <span>Total</span>
                <span className='ml-auto '><b>$
                { Array.isArray(cartdata) &&
  cartdata.length!==0 && cartdata.map((item)=>   parseInt(item?.price)*item?.Quantiy).reduce((total,value)=>total+value,0)

}.00</b></span>
            </div>
            <br />
            <Link to={"/checkout"} className='w-100'>
         
            <button className='bg-blue btn-lg  bg-big  w-100' >Check Out</button></Link>
                            </div>
                        </div>
                </div>
            </div>
        </section>
    )
}

export default Cart
