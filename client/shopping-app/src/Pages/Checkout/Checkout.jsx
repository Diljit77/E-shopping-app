import { TextField } from '@mui/material'
import { useContext } from 'react';
import { MyContext } from '../../App';
import React, { useEffect, useState } from 'react'
import { fetchDataFromApi, PostData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';




function Checkout() {
const history=useNavigate();
    const context=useContext(MyContext);
const [cartdata,setcartdata]=useState([]);
const [totalamount,settotalamount]=useState();

   useEffect(() => {
      
    fetchDataFromApi("/api/cart/").then((res)=>{
        setcartdata(res);
      

    })
})
    const [formfield,setformfield]=useState({
  fullname:"",
  country:"",
  streetaddressline1:"",
  streetaddressline2:"",
  city:"",
  state:"",
  zipcode:"",
  phonenumber:"",
  email:""
    })
const onchangeinput=(e)=>{
    setformfield(()=>({
        ...formfield,[e.target.name]:e.target.value
    }))
}
 const placeorder=(e)=>{
    e.preventDefault();
    settotalamount(cartdata.length!==0 && cartdata.map((item)=>   parseInt(item?.price)*item?.Quantiy).reduce((total,value)=>total+value,0));
    console.log(formfield)
    if(formfield.fullname==""){
        context.setalertbox({
            msg:"Please fill full name",
       open:true,
       error:true,
    
     })
     return false
    }    if(formfield.country==""){
        context.setalertbox({
            msg:"Please fill country",
       open:true,
       error:true,
    
     })
     return false
    }
    if(formfield.state==""){
        context.setalertbox({
            msg:"Please fill state",
       open:true,
       error:true,
    
     })
     return false
    }
    if(formfield.city==""){
        context.setalertbox({
            msg:"Please fill city",
       open:true,
       error:true,
    
     })
     return false
    }
    if(formfield.zipcode==""){
        context.setalertbox({
            msg:"Please fill Zip Code",
       open:true,
       error:true,
    
     })
     return false
    }
    if(formfield.phonenumber===""){
        context.setalertbox({
            msg:"Please fill Phone Number",
       open:true,
       error:true,
    
     })
     return false
    }
    if(formfield.email===""){
        context.setalertbox({
            msg:"Please fill email",
       open:true,
       error:true,
    
     })
     return false
    }
const addressinfo={
    name:formfield.fullname,
    phonenumber:formfield.phonenumber,
    address:formfield.streetaddressline1,
    pincode:formfield.zipcode,
    date:new Date().toLocaleString(
        "en-US",{
            month:"short",
            day:"2-digit",
            year:"numeric"
        }
    )
}
var options={
    key:import.meta.env.VITE_RAZORPAY_API_KEY,
 key_secret:import.meta.env.VITE_REZORPAY_API_SECRET,
 amount:parseInt(totalamount*100),
 currency:"INR",
 order_receipt:`order_rcptid_`+formfield.name,
 name:"E-Bharart",
 description:"for testing prupose",
 handler: function (response){
const paymentid=response.razorpay_payment_id
const user=JSON.parse(localStorage.getItem("user"))
const payload={
    name:addressinfo.name,
    phonenumber:formfield.phonenumber,
    address:addressinfo.address,
pincode:addressinfo.pincode,
amount:parseInt(totalamount*100),
paymentId:paymentid,
email:user.email,
userid:user.userId,
products:cartdata,
}

console.log(payload)
PostData("/api/orders/create",payload).then((res)=>{
    history("/");}).catch(err=>console.log(err));
 },
 theme:{
color:"#3399cc"
 }
}

const pay= window.Razorpay(options);
pay.open();
 }
  
    return (
        <div>
            <section>
                <div className="container">
                    <form className='checkout-form' onSubmit={placeorder}>
                    <div className="row">
                        <div className="col-md-8">
<h2 className=''>Billing details</h2>
<div className="row mt-7">
    <div className="col-md-6">
        <div className="form-group">
            <TextField label="Full Name" variant='outlined' size='small' className='w-100' name="fullname" onChange={onchangeinput} />
            </div>   
             </div>
             <div className="col-md-6">
        <div className="form-group">
        <TextField label="Country" variant='outlined' size='small' className='w-100' name="country" onChange={onchangeinput} />
            </div>   
             </div>
</div>
<h6>Street Address</h6>
<div className="row mt-3">
<div className="col-md-12">
  
        <div className="form-group">
        <TextField label="House no and street name" variant='outlined' size='small' name="streetaddressline1" onChange={onchangeinput}  className='w-100' />
        </div>
        <div className="form-group">
        <TextField label="Apartment suite ,unit etc(optional)" variant='outlined' size='small' name="streetaddressline2" onChange={onchangeinput}  className='w-100' />
        </div>

</div>
</div>
<h6>Town/City</h6>
<div className="row mt-3">
<div className="col-md-12">
  
        <div className="form-group">
        <TextField label="House no and street name" variant='outlined' size='small' name="city" onChange={onchangeinput}  className='w-100' />
        </div>
     

</div>
</div>
<h6>State/Country</h6>
<div className="row mt-3">
<div className="col-md-12">
  
        <div className="form-group">
        <TextField label="State/Dountry" variant='outlined' name="state" onChange={onchangeinput}  size='small' className='w-100' />
        </div>
     

</div>
</div>
<div className="row mt-3">
<div className="col-md-12">
  <h6>PostCode/Zip</h6>
        <div className="form-group">
        <TextField label="Zip Code" variant='outlined' name="zipcode" onChange={onchangeinput}  size='small' className='w-100' />
        </div>
        <div className="row mt-3">
<div className="col-md-6">
  
        <div className="form-group">
  
        <TextField label="Phone Number" variant='outlined' name="phonenumber" onChange={onchangeinput}  size='small' className='w-100' />
        </div>
   
     

</div>
<div className="col-md-6">
  
        <div className="form-group">
        <TextField label="Email address" variant='outlined'name="email" onChange={onchangeinput}  size='small' className='w-100' />
        </div>
   
     

</div>
</div>
     

</div>
</div>
                        </div>
                        <div className="col-md-4 mt-5">
                        <div className="card orderinfo">
                            <h4 className='hd'>Your Orders</h4>
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                   <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Subtotal</th>
                                    </tr>
                                   </thead>
                                   <tbody>
                                  
                                
                                        {
                                                    cartdata.length!==0 && Array.isArray(cartdata) && cartdata?.map((item,index)=>{
                                                        return(
                                                            <tr>
                                                <td>{item?.productName.substr(0,30)+"..."}<b>*{item?.Quantiy}</b></td>
                                                <td>${item?.subtotal}.00</td>
                                                            </tr>
                                                          
                                                          
                                                        )
                                                    })
                                        }
                            
                                    
                                    
                                    <tr>
                                        <td>Subtotal</td>
                                        <td>$               {
  cartdata.length!==0 && cartdata.map((item)=>   parseInt(item?.price)*item?.Quantiy).reduce((total,value)=>total+value,0)

}.00</td>
                                    </tr>
                                   </tbody>
                                </table>
                            </div>
                            <button type='submit' className='bg-blue btn-lg  bg-big ml-3'>Place Orders</button>
                        </div>
                        </div>
                    </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Checkout
