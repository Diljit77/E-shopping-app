import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { FaAngleDown } from 'react-icons/fa';
import { IoSearch } from "react-icons/io5";
import Dialog from '@mui/material/Dialog';
import {MdClose} from "react-icons/md"
import { Slide} from '@mui/material';
import { MyContext } from '../../App';
const Transistion=React.forwardRef(function Transistion(props,ref){
  return <Slide direction='up' ref={ref} {...props } />
})
function CountryDrop() {
  const [countryList,setcountryList]=useState([])
  const filterList=(e)=>{
e.target.value.toLoweCase();

  }
  useEffect(()=>{
    
  })
  const context=useContext(MyContext)
  const [isOpenModal,setisOpenModal]=useState(false);
  return (
    <div>
      <Button className="countrydrop" onClick={()=>{setisOpenModal(true)}}>
        <div className="info d-flex flex-column">
          <span className='label'>Your Location</span>
          <span className='name'>India</span>
        </div>
        <span className='ml-auto'><FaAngleDown /></span>
      </Button>
      <Dialog open={isOpenModal} className="locationModal" TransitionComponent={Transistion}>
        <h4 className='mb-0'>Choose your Delivery Location</h4>
        <p>Enter your address and we will specify the offer for your area</p>
        <button className='close_' onClick={()=>{setisOpenModal(false)}} ><MdClose /></button>
<div className="headerSearch w-100">
  <input type='text' placeholder='Search your area....' onChange={filterList}/>
  <button><IoSearch /></button>
</div>
<ul className="countryList">

  <li><button onClick={()=>{setisOpenModal(false)}} >India</button></li>
  <li><button onClick={()=>{setisOpenModal(false)}} >Sri Lanka</button></li>
  <li><button onClick={()=>{setisOpenModal(false)}} >Dubai</button></li>
   <li><button onClick={()=>{setisOpenModal(false)}} >U.S.A</button></li> 
  <li><button onClick={()=>{setisOpenModal(false)}} >Australia</button></li>
  <li><button onClick={()=>{setisOpenModal(false)}} >Sri Lanka</button></li>
  <li><button onClick={()=>{setisOpenModal(false)}} >Dubai</button></li>
  <li><button onClick={()=>{setisOpenModal(false)}} >U.S.A</button></li>
  <li><button onClick={()=>{setisOpenModal(false)}} >Australia</button></li> 
</ul>
      </Dialog>
    </div>
  )
}

export default CountryDrop
