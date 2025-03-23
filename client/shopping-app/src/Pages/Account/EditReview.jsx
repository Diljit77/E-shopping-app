import React, { useContext, useEffect, useState } from 'react'
import { CircularProgress, Rating } from '@mui/material'
import { editData, fetchDataFromApi } from '../../utils/api';
import { useParams } from 'react-router-dom';
import { MyContext } from '../../App';
function EditReview() {
     const context=useContext(MyContext);
    const [isLoading,setisloading]=useState(false);
    const [editReview, setEditReview] = useState(null);
const [updatedReview, setUpdatedReview] = useState("");
    const {id}=useParams();
      const [review,setreview]=useState({
            customerName:"",
            review:"",
        customerRating:0,
        productId:"",
        customerId:""
    
        });
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setreview((prev) => ({
                ...prev,
                [name]: value  // Ensure state updates dynamically
            }));
        };
        const handleRatingChange = (event, newValue) => {
            setreview((prev) => ({
                ...prev,
                customerRating: newValue
            }));
        };
    
            useEffect(()=>{
              
              
                fetchDataFromApi(`/api/review/myreview/${id}`).then((res)=>{
                    console.log(res[0]);
                    setreview({
                        customerName:res[0].customerName,
                        review:res[0].review,
                        customerRating:res[0].customerRating,
                        productId:res[0].productId,
                        customerId:res[0].customerId,
                    })
                })
            },[id])
            const edit=(e)=>{
                e.preventDefault();
                if(review.customerName===""||review.review===""){
                    return   context.setalertbox({
                        msg:"Please fill all the fileds",
                   open:true,
                   error:true,
                  
                  })
                }
                editData(`/api/review/${id}`,review).then((res)=>{
                    if(!res){
                        return   context.setalertbox({
                            msg:"Please try again",
                       open:true,
                       error:true,
                      
                      })
                    }
                    if(res.success===true){
                        context.setalertbox({
                            msg:"review updated succefully",
                       open:true,
                       error:false,
                      
                      })
                    }
                }).catch((err)=>{
                    console.log(err)
                    return   context.setalertbox({
                        msg:"Please try again",
                   open:true,
                   error:true,
                  
                  })
                })

}
  return (
    <div className="container">

  
    <form className='reviewForm' onSubmit={edit}>
    <h3 className='mt-2 ml-auto mr-auto'>Edit your a Review</h3>
    <div className="form-group">
        <textarea className='form-control  w-50' placeholder='Write a Review' value={review.review} onChange={handleInputChange} name='review'></textarea>
    </div>
  
<div className="">

<input type="text" className='form-control  shadow w-50' value={review.customerName} name='customerName' onChange={handleInputChange} placeholder='Name' /></div>



<div className="form-group">
<Rating name='rating' className='ml-auto mr-auto' onChange={handleRatingChange}  value={4} />
</div>
   



  
    <button  type='submit'  className='bg-blue btn-lg btn-round bg-big w-25 ml-auto mr-auto '>
        { isLoading===true?<CircularProgress /> :"Submit Review"}</button>
</form>
</div>
  )
}

export default EditReview
