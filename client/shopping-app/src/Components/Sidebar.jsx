import React, { useEffect } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from "react-range-slider-input"
import "react-range-slider-input/dist/style.css"
import { useState } from 'react';
import { Link } from '@mui/material';
import Radio from '@mui/material/Radio';
import Rating from '@mui/material/Rating';
import RadioGroup from '@mui/material/RadioGroup';
import { useParams } from 'react-router-dom';

import { fetchDataFromApi } from '../utils/api';

function Sidebar(props) {
  const [value,setValue]=useState([0,1000]);
  const [subcatId,setSubCatId]=useState('');
  const [value2,setValue2]=useState(0);
  const {id}=useParams();
  const [value1, setValue1] = React.useState(id);

   const [subcat,setSubCat]=useState([])
  useEffect(() => {
   fetchDataFromApi("/api/subcat").then((res)=>{
  setSubCat(res)  
  
   })
   props.filterByprice(value,subcatId)
  
   
  },[value])
  useEffect(()=>{
setSubCatId(value1);
  },[value1])

  

  const handleChange = (event) => {
setValue1(event.target.value)
    props.filterdata(event.target.value);
  };
 const filterByrating=(rating)=>{
props.filterByrating(rating,subcatId)

 }
  
  return (
    <>
      <div className="sidebar">
        <div className="sticky">
        <div className="filtersBox">
            <h6>PRODUCT CATEGORIES</h6>
            <div className="scroll">
            <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value1}
        onChange={handleChange}
      >
           <ul>{
            subcat?.map((item,index)=>{
              return(
                <li>
            
                <FormControlLabel value={item.id} control={<Radio />} label={item.subCat} />
                </li>
              )
            })}
         
      
           </ul>

    
      </RadioGroup>
        

            </div>
        </div>
        <div className="filtersBox">
            <h6>FILTER BY PRICE</h6>
            <RangeSlider value={value} onInput={setValue} min={0} max={1000} step={5} />
            <div className="d-flex pt-2 pb-2 priceRange">
                <span>From :<strong className='text-success'>$:{value[0]}</strong></span>
                <span className='ml-auto'>To:<strong className='text-success'>$:{value[1]}</strong></span>
            </div>
        </div>
        
      
          
        <div className="filtersBox">
            <h6>Filter BY Rating</h6>
            <div className="scroll">
           {/* <ul>
            <li>
            <FormControlLabel control={<Checkbox  />} label="In Stock" />
            </li>
            <li>
            <FormControlLabel control={<Checkbox  />} label="On Site" />
            </li>
            <li>
            <FormControlLabel control={<Checkbox />} label="In Stock" />
            </li>
            <li>
            <FormControlLabel control={<Checkbox  />} label="On Site" />
            </li>
          
          
           </ul> */} 
           <ul>
          <li className='mt-2' onClick={()=>filterByrating(5)}><Rating name="read-only" value={5}  readOnly size="small"/> </li>
          <li className='mt-2'  onClick={()=>filterByrating(4)}><Rating name="read-only" value={4} readOnly size="small" /> </li>
          <li className='mt-2'  onClick={()=>filterByrating(3)}><Rating name="read-only" value={3} readOnly  size="small"/> </li>
          <li className='mt-2'  onClick={()=>filterByrating(2)}><Rating name="read-only" value={2} readOnly size="small"  /> </li>
          <li className='mt-2'  onClick={()=>filterByrating(1)}><Rating name="read-only" value={1} readOnly size="small"/> </li>
           </ul>
                  
            </div>
        </div>
        <br />
        <Link to="#"><img src="https://api.spicezgold.com/download/file_1734525757507_NewProject(34).jpg" style={{marginBottom:"20px"}} className='w-100' alt="" /></Link>
        <Link to="#">   <img src="https://api.spicezgold.com/download/file_1734525767798_NewProject(35).jpg" className='w-100' alt="" /></Link>
      </div>
      </div>
    </>
  )
}

export default Sidebar
