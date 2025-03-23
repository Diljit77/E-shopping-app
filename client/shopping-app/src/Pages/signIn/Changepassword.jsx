import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../App'
import Logo from "../../assets/images/logo.png"
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from '@mui/material';


import { Link, useNavigate } from 'react-router-dom';
import { PostData } from '../../utils/api';

function Changepassword() {
  const context = useContext(MyContext);

  const [Loading, setLoading] = useState(false)
  const history = useNavigate();
  useEffect(() => {
    context.setisHeaderFooter(false);
  }, [])
  const [formfield, setformfield] = useState({
    email:localStorage.getItem("userEmail"),
    newpassword: "",
    confirmpassword: ""
  })

  const changeInput = (e) => {
    setformfield(() => ({
      ...formfield, [e.target.name]: e.target.value
    }


    ))
    console.log(formfield)
  }
const changepass=(e)=>{
e.preventDefault();
try {
    if(formfield.newpassword===""){
        context.setalertbox({
            open:true,
            error:true,
            msg:"enter the password"
      
          })
    }
    if(formfield.confirmpassword===""){
      return  context.setalertbox({
            open:true,
            error:true,
            msg:"please confirm the password"
      
          })
    }
    if(formfield.confirmpassword!==formfield.newpassword){
        return  context.setalertbox({
            open:true,
            error:true,
            msg:"the pasword is not match"
      
          }) 
    
    }  
    let Email=localStorage.getItem("userEmail")
    let user={
        email:Email,
        newPass:formfield.newpassword
    }
    PostData("/api/User/forgetpassword/changepassword",user).then((res)=>{
        if(res.success===true){
              context.setalertbox({
                open:true,
                error:false,
                msg:"Password Changed successfully"
          
              }) 
              localStorage.removeItem("userEmail");
              localStorage.removeItem("actionType");
              history("/signin");
        }
    })
} catch (error) {
    console.log(error)
}

}

  return (

    <section className="section signinPage">
 
      <div className="container">
        <div className=" box card p-3 shadow border-0" >
          <div className="text-center">
            <img src={Logo} alt="" className='img' />
          </div>
          <form >

            <div className="form-group mt-3">
              <h2>Change Password</h2>
              <TextField id="standard-basic" onChange={changeInput} name='newpassword' label="New Password" type='text' required variant="standard" className='w-100' />
            </div>
            <div className="form-group">
              <TextField id="standard-basic" label="confirm password" name='confirmpassword' onChange={changeInput} type='text' required variant="standard" className='w-100' />


            </div>
          
            <div className="form-group d-flex ">
              <Link to={"/"} onClick={changepass}  className='w-100'> <button className='bg-blue btn-lg  bg-big  col w-100' >
                { Loading===true? <CircularProgress /> : "Change Password"
}</button></Link>
             

            </div>
         
         
          </form>
          
        </div>
   
      <button>

      </button>
      </div>
    </section>
  )
}

export default Changepassword

