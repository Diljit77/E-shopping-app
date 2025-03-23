import React, { useContext, useEffect, useRef, useState } from 'react'
import logo from "../../assets/images/logo.png"
import { IoSearch } from 'react-icons/io5'
import { fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
function Searchbox() {
  const context=useContext(MyContext);
  
  const [isLoading,setisloading]=useState(false)
    const [searchfield,setsearchfield]=useState('');
    const [showResults, setShowResults] = useState(false);
    const resultsRef = useRef(null);

    const changevalue=(e)=>{
      const query = e.target.value; // Get the current value
      setsearchfield(query);

if(query!==""){


fetchDataFromApi(`/api/search?q=${query}`).then((res)=>{
  context.setsearchData(res);
  setShowResults(true);
})
}else{
  context.setsearchData([]);
  setShowResults(false); 

}
  
    }
   
    const searchProducts=()=>{
      setisloading(true)

// fetchDataFromApi(`/api/search?q=${searchfield}`).then((res)=>{
//   context.setsearchData(res);
//   history("/search")
// setisloading(false)

  
// })

    }
    const handleClickOutside = (event) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target) &&
        event.target.id !== "searchInput"
      ) {
        setShowResults(false);
      }
    };
  
    // Add event listener when component mounts
    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);
  
  return (
       <div className="headerSearch ml-3">
                    <input type="text" placeholder='Serach your Products......' id="searchInput" onFocus={() => setShowResults(true)}
 onChange={changevalue}  />
         <button onClick={searchProducts} >
          {
            isLoading===true ?<CircularProgress className='LOAD' /> :<IoSearch  />
          }
          {/* <IoSearch  /> */}
          </button> 
          <div  className="searchResults res-hide">
          { showResults===true &&
            context.searchData.length!==0 && context.searchData.map((item,index)=>{
return (
  <div key={index} className="d-flex  align-items-center result" >
  <div className="img ">
    <Link to={`/product/${item._id}`}  >
  <img src={item.images[0]} alt="" className='w-100' />
    </Link>
  </div>
  <div className="info ml-5">
    <Link to={`/product/${item._id}`} >
   
    <h6 className='mb-1'>{item.name.substr(0,30)+"....."}</h6>
    </Link>
    <span>${item.price}</span>
  </div>
</div>
)
            })
          }
          </div>


                </div>
  )
}

export default Searchbox
