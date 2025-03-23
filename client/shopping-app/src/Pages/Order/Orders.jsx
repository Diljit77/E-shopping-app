import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../../utils/api';
import { Dialog } from '@mui/material';
import { MdClose } from 'react-icons/md'

function Orders() {
    const [orders,setorders]=useState([]);
    const [products,setproducts]=useState([]);
    const [isOpenModal,setisOpenModal]=useState(false)

    useEffect(()=>{
        window.scrollTo(0,0);
        setTimeout(() => {
            const user=JSON.parse(localStorage.getItem("user"));
            let userId=user?.userId
            fetchDataFromApi(`/api/orders/`).then((res)=>{
                setorders(res);
            }).catch((err)=>console.log(err))
    
          }, 3000);
        
    },[]);
    const showproducts =(id)=>{
fetchDataFromApi(`/api/orders/${id}`).then((res)=>{

setproducts(res.products)
setisOpenModal(true)
})
    }
  return (
   <section className="section">
    <div className="container">
      <h2 className="hd">Orders</h2>
<div className="table-responsive order-table">
    <table className="table table-striped o">
        <thead className='thead-dark'>
            <tr>
                <th>Payment Id</th>
                <th>Products</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address </th>
                <th>Pin Code</th>
                <th>Amount</th>
                <th>Email</th>
                <th>User Id</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {     
                orders?.orderList?.length!==0 && orders?.orderList?.map((order,index)=>{
                    return (
                        <tr key={index}>
                        <td>{order?.paymentId}</td>
                        <td><span className='font-weight-bold cursor' onClick={()=>showproducts(order?._id)}>Click here to view</span>
                    
                    </td>
                        <td>{order.name}</td>
                        <td>{order.phonenumber}</td>
                        <td>{order?.address}</td>
                        <td>{order?.pincode}</td>
                        <td>₹{(order?.amount)/100}</td>
                         <td>{order?.email}</td>
                         <td>{order?.userid}</td>
                         <td>{order?.Date}</td>
                    </tr>
                    )
                })
            }
            {/* <tr>
                {/* <td>fghkhgj</td>
                <td>fghkhgj</td>
                <td>fghkhgj</td>
                <td>fghkhgj</td>
                <td>fghkhgj</td>
                <td>fghkhgj</td>
                 <td>fghkhgj</td>
                 <td>fghkhgj</td>
                 <td>fghkhgj</td>
            </tr> */} 
        </tbody>
    </table>
</div>
    </div>
      <Dialog open={isOpenModal} className="productModal" >
          
            <button className='close_'  onClick={()=>setisOpenModal(false)} ><MdClose /></button>
            <h4 className='mb-4 font-weight-bold pr-5'>Products</h4>
 
            <div className="table-responsive order-table">
    <table className="table table-striped o">
        <thead className='thead-dark'>
            <tr>
                <th>Product Id</th>
                <th>Product Name</th>
             
                <th>Quantity</th>
                <th>Price</th>
                <th>subtotal</th>
            </tr>
        </thead>
        <tbody>
            {
                products.length!==0 && products.map((item,index)=>{
                    return (
                        <tr>
                        <td>{item?._id}</td>
                        <td>{item?.productName}</td>
                      
                        <td>{item?.Quantiy}</td>
                        <td>{item?.price}</td>
                        <td>{item?.subtotal}</td>
                    </tr>
                    )
                })
            }
        
        </tbody>
        </table>
        </div>
          </Dialog>
   </section>
  )
}

export default Orders
