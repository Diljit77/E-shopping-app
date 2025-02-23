import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../App'
import { useNavigate } from 'react-router-dom';
import { PostData } from '../../utils/api';
import Logo from "../../assets/images/logo.png"
import Otpbox from '../../Components/Otpbox';
import { CircularProgress } from '@mui/material';

function VerifyOtp() {
    const [otp,setotp]=useState("")
    const [isLoding,setIsLoading]=useState(false)
    const context=useContext(MyContext);
    const history=useNavigate();
    const handleChange=(value)=>{
        setotp(value)

    }
    useEffect(()=>{
        context.setisHeaderFooter(false);
    },[])
    const verify=(e)=>{
        e.preventDefault();
        if(otp!==""){
            const actionTypes=localStorage.getItem("actionType");
           
              setIsLoading(true)
                const obj={
                    otp:otp,
                    email:localStorage.getItem("userEmail")
                }
                PostData(`/api/User/verifyemail`,obj).then((res)=>{
                    if(res.success===true){
                        context.setalertbox({
                            open:true,
                            error:false,
                            msg:"Email Verified Succesfully"
                              });
                          
                              
                              if(actionTypes==="Change_password"){
                    history("/changepassword");  
                              }else{
                                history("/signin")
                                localStorage.removeItem("userEmail")
                              }
                    }else{
                        context.setalertbox({
                            open:true,
                            error:true,
                            msg:res.message
                              });
                              setIsLoading(false)
                    }
                })
              
            
        
        }else{
            context.setalertbox({
                open:true,
                error:true,
                msg:"Please enter otp"
                  });
        }
  

    }

  return (
<section className='section signinPage'>
    <div className="conntainer">
        <div className="box card p-3 shadow border-0">
            <div className="text-center">
                <img src={Logo} width={"100px"} alt="" />
            </div>
            <form className='mt-3' onSubmit={verify}>
                <h2 className='mb-1 text-center'>OTP Verification</h2>
                <p className="text-center text-light">OTP has been sent to {localStorage.getItem("userEmail")}</p>
                <Otpbox length={6} onchange={handleChange} />
                <div className="d-flex align-item-center mt-3 mb-3">
                <button type='submit' className='bg-blue btn-lg  bg-big text-center ml-auto mr-auto'>
                    {isLoding===true ?<CircularProgress /> :"Verify OTP"}
                </button>
                    
                </div>
                <p className='text-center'>
                    <a href="" className='border-effect cursor txt'>Resend OTP</a>
                </p>
            </form>
        </div>
    </div>
</section>
  )
}

export default VerifyOtp
