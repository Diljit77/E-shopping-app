import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import Button from '@mui/material/Button';
import { MdMenu } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";
import { BsFillGridFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProductItem from '../Home/ProductItem';

import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';

function Listingbycategory() {
    const {id}=useParams();
    const [productData,setProductData]=useState([])
    useEffect(() => {

        setTimeout(() => {
            fetchDataFromApi(`/api/product/category/${id}`).then((res)=>{
                setProductData(res);
                  })
          }, 1000);
        
    
    
  
    },[id])
    const filterdata=(subcatId)=>{
        // fetchDataFromApi(`/api/product/category?subcatId=${subcatId}`).then((res)=>{
        //     setProductData(res);
      
        //       })  
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const [productView, setproductView] = useState("four")
    const opendropdown = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const filterByprice=(price,subcatId)=>{
        // fetchDataFromApi(`/api/product/category?minPrice=${price[0]}&maxPrice=${price[1]}&subcatId=${subcatId}`).then((res)=>{
        //     setProductData(res.products);
      
        //       })  

                 
    }
    const filterByrating=(rating,subcatId)=>{
        // fetchDataFromApi(`/api/product/category?rating=${rating}&subcatId=${subcatId}`).then((res)=>{
        //     setProductData(res);
      
        //       }) 
             }

    return (
        <>
            <section className="product_Listing_page">
                <div className="container ">
                    <div className="productListing d-flex">
                        <Sidebar filterdata={filterdata} filterByprice={filterByprice} filterByrating={filterByrating} />
                        <div className="content_right">
                            <img src="https://api.spicezgold.com/download/file_1734524930884_NewProject(6).jpg" className='w-100' alt="" />
                         
                            <div className="showBy mt-3 mb-3 d-flex align-items-center">
                                <div className="d-flex btnWrapper">
                                    <Button className={productView==="one" && "act"} onClick={() => setproductView("one")} ><MdMenu /></Button>
                                    <Button className={productView==="two" && "act"} onClick={() => setproductView("two")} ><BsFillGridFill /></Button>
                                    <Button className={productView==="three" && "act"} onClick={() => setproductView("three")} ><CgMenuGridR /></Button>
                                    <Button className={productView==="four" && "act"} onClick={() => setproductView("four")} ><TfiLayoutGrid4Alt /></Button>
                                </div>
                                <div className="ml-auto showByfilter">
                                    <Button onClick={handleClick}>Show 9<FaAngleDown /></Button>
                                    <Menu
                                        className='w-100 showPerPage'
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={opendropdown}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>10</MenuItem>
                                        <MenuItem onClick={handleClose}>20</MenuItem>
                                        <MenuItem onClick={handleClose}>30</MenuItem>
                                        <MenuItem onClick={handleClose}>40</MenuItem>
                                        <MenuItem onClick={handleClose}>50</MenuItem>
                                        <MenuItem onClick={handleClose}>60</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <div className="product_Listing">                           
                                     { Array.isArray(productData) &&
                                     productData?.map((item,index)=>{
                                    return(
                                        <ProductItem key={index} itemView={productView} item={item}/>  
                                    )
                                })
                                }
                                

                            </div>
                            {/* <div className="d-flex align-items-center justify-content-center">
                                <Pagination count={10} style={{marginTop:"20px"}} color='primary' size='large' />
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Listingbycategory
