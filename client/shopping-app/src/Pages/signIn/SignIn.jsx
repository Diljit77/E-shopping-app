import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../App'
import Logo from "../../assets/images/logo.png"
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from '@mui/material';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseapp } from '../../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { PostData } from '../../utils/api';
import googlelogo from "../../../src/assets/images/google.png"
const auth = getAuth(firebaseapp);
const provider=new GoogleAuthProvider();
function SignIn() {
  const context = useContext(MyContext);

  const [Loading, setLoading] = useState(false)
  const history = useNavigate();
  useEffect(() => {
    context.setisHeaderFooter(false);
  }, [])
  const [formfield, setformfield] = useState({
    email: "",
    password: ""
  })

  const changeInput = (e) => {
    setformfield(() => ({
      ...formfield, [e.target.name]: e.target.value
    }


    ))
    console.log(formfield)
  }
const signin=(e)=>{
  e.preventDefault(); 
  try{
  if(formfield.email===""){
    context.setalertbox({
      open:true,
      error:true,
      msg:"email is blank"
    })
    return false
  }
  if(formfield.password===""){
    context.setalertbox({
      open:true,
      error:true,
      msg:"password is blank"
    })

    return false
  }
  console.log(formfield)
  setLoading(true)
  PostData("/api/User/signin",formfield).then(async (res)=>{
if( await res.status !==false){
    localStorage.setItem("token",res.token);
    const user={
      name:res.user?.name,
      email:res.user?.email,
      userId:res.user?.id
    }


    
    localStorage.setItem("user",JSON.stringify(user));
    context.setalertbox({
  open:true,
  error:false,
  msg:"User Login Successfully"
    });
  
setTimeout(()=>{
  setLoading(false);

  window.location.href="/";
})
    

  }else{
    setLoading(false)
    context.setalertbox({
      open:true,
      error:true,
      msg:res.message

    })
  }
}).catch(errr=>console.log(errr))
} catch (error) {
  console.log(error)
  setLoading(false)
  context.setalertbox({
    open:true,
    error:true,
    msg:"User does't exist"
      });
}


}
const signwithgoogle=()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
   const fields={
 name:user.providerData[0].displayName,
 email:user.providerData[0].email,
 password:null,
 images:user.providerData[0].photoURL,
 phone:user.providerData[0].phoneNumber
   }
   PostData("/api/User//loginwithgoogle",fields).then((res)=>{
    try{
      if(res.error!==true){
        localStorage.setItem("token",res.token);
        const user={
          name:res.user?.name,
          email:res.user.email,
          userId:res.user._id
        }
        localStorage.setItem("user",JSON.stringify(user))
        context.setalertbox({
          open:true,
          error:false,
          msg:"User Login Successfully"
            });
             context.setisHeaderFooter(true)
            history("/");
      }
    }catch(err){

    }
   })
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(error)
    // ...
  });

}
const forgetpassword=()=>{
  if(formfield.email===""){
    context.setalertbox({
      open:true,
      error:true,
      msg:"please enter email"
    })
    return false
  }else{
    localStorage.setItem("userEmail",formfield.email);
    let email={
      email:formfield.email
    }
    localStorage.setItem("actionType","Change_password");
    PostData("/api/User/forgetpassword",email).then((res)=>{
      if(res.status==="success"){

      }
    })
    history("/verify")
  }

}
  return (

    <section className="section signinPage">
      {/* <div className="shape-bottom">
        <svg fill='#fff' id="Layer_1" x="0px" y="0px" viewBox='00 1921 819.8' style={{ enableBackground: "new 0 0 1921 819.8" }}
        ><path className='st0' d='M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z'></path></svg>
      </div> */}
      <div className="container">
        <div className=" box card p-3 shadow border-0" >
          <div className="text-center">
            <img src={Logo} alt="" className='img' />
          </div>
          <form >

            <div className="form-group mt-3">
              <h2>Sign In</h2>
              <TextField id="standard-basic" onChange={changeInput} name='email' label="Email" type='email' required variant="standard" className='w-100' />
            </div>
            <div className="form-group">
              <TextField id="standard-basic" label="Password" name='password' onChange={changeInput} type='password ' required variant="standard" className='w-100' />


            </div>
            <div className="form-group">
              <a className="border-effect cursor mt-3 " onClick={forgetpassword}>Forget Password?</a>
            </div>
            <div className="form-group d-flex ">
              <Link to={"/"}  className='w-100'> <button onClick={signin} className='bg-blue btn-lg  bg-big  col w-100' >
                { Loading===true? <CircularProgress /> : "Sign In"
}</button></Link>
              <Link to={"/"}   className='w-100' ><button onClick={() => context.setisHeaderFooter(true)} className=' bg-big  col w-100 ml-1' >Cancel</button></Link>

            </div>
            <div className="form-group">
              <p>Not Registered ?<Link to="/signup" className='border-effect'>Sign Up
              </Link></p>
            </div>
         
          </form>
          <h6 className='mt-2 text-center font-weight-bold'>continue with Social Account</h6>
          <div className="mt-2">
            <button className='loginwithGoogle mt-1'  onClick={signwithgoogle}>
              <img src={googlelogo} alt="" />Sign In with Google</button>
          </div>
        </div>
   
      <button>

      </button>
      </div>
    </section>
  )
}

export default SignIn
