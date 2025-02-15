import React, { useEffect, useState } from 'react'
import { FaMinus } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'

function QuantityDrop(props) {
    const [inputVal, setinputVal] = useState(1)
    const minus = () => {
        if(inputVal===1){
            setinputVal(inputVal)
            props.setchangeQuantity(inputVal)
        }else{
            setinputVal(inputVal-1)
            setinputVal(inputVal-1)
        }

    }    
  
  
   
    useEffect(() => {
     
        props?.selecteditem(props.item,inputVal);
      
    },)
    
    const plus = () => {
setinputVal(inputVal+1)
props.setchangeQuantity(inputVal+1)
    }
    return (
        <div className="quantityDrop d-flex align-items-center">
            <button onClick={minus}><FaMinus /></button>
            <input type="text" value={inputVal} />
            <button onClick={plus}><FaPlus /></button>
        </div>
    )
}

export default QuantityDrop
