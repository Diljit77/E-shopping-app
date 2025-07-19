
import { Rating } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"

import { MdDeleteForever } from "react-icons/md";
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';
import WishList from "../../assets/images/empty-wishlist.jpg"

function WIshList() {
    const context=useContext(MyContext);
    const [myListdata,setmyListdata]=useState([]);
    
    
   
  

    useEffect(() => {
      
    fetchDataFromApi("/api/myList/").then((res)=>{
        setmyListdata(res);
    context.setmylistdata(res);
      

    })
  
    })


    
const reoveme=(id)=>{
deleteData(`/api/myList/${id}`).then((res)=>{
    context.setalertbox({
        msg:"Item removed from wishlist",
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
                        My List
                    </h2>
                    <p>There <b>{myListdata.length}</b> Products in your WishList</p>
                    {
                        myListdata.length===0 && <div className="d-flex">
                            <img src={WishList} alt="" className='w-50 m-auto'   />
                        </div>
                    }
                    {
                        myListdata.length!==0 &&    <div className="row d-flex">
                  
                        <div className="col-md-8">
    
                            <div className="table-responsive">
                                <table className='table'>
                                    <thead> <tr>
                                        <th width="50%" className='ml-6' >Product</th>
                                        <th width="15%">Unit Price</th>
                                     
                                  
                                        <th width="15%">Remove</th>
                                    </tr></thead>
                                    <tbody>
                                        {  
                                        myListdata.length!==0 && Array.isArray(myListdata) && myListdata?.map((item,index)=>{
                                            return(
    
                                            
                                        <tr key={index}>
                                        <td width="40%"> <Link to={`/product/${item?.productId}`} >
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
                                      
                                   
    
                                        <td width="15%"><span className='remove' onClick={()=>reoveme(item?._id)} ><MdDeleteForever /></span></td>
                                    </tr>
                                            )
    
                                    })
                                }
                                        
                                     
                                       
                                      
                                    </tbody>
                                </table>
                            </div>
                           
                        </div>
                
                    </div>
                    }
             
            </div>
        </section>
    )
}

export default WIshList
