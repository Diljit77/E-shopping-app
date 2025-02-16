import React, { useContext, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
function Searchbox() {
  const context=useContext(MyContext);
  const history=useNavigate();
  const [isLoading,setisloading]=useState(false)
    const [searchfield,setsearchfield]=useState('')
    const changevalue=(e)=>{
setsearchfield(e.target.value);
    
  
    }
    const searchProducts=()=>{
      setisloading(true)

fetchDataFromApi(`/api/search?q=${searchfield}`).then((res)=>{
  context.setsearchData(res);
  history("/search")
setisloading(false)

  
})
    }
  return (
       <div className="headerSearch ml-3">
                    <input type="text" placeholder='Serach your Products......' onChange={changevalue}  />
         <button onClick={searchProducts} >
          {
            isLoading===true ?<CircularProgress /> :<IoSearch />
          }</button> 


                </div>
  )
}

export default Searchbox
