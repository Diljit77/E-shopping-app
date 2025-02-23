import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App'
import Logo from "../../assets/images/logo.png"
import TextField from '@mui/material/TextField';
import { PostData } from '../../utils/api';
import { CircularProgress } from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseapp } from '../../firebase/firebase';
import googlelogo from "../../../src/assets/images/google.png";
const auth = getAuth(firebaseapp);
const provider=new GoogleAuthProvider();

function Signup() {
  const history=useNavigate();
  const [formfield,setformfield]=useState({
    name:"",
  email:"",
  password:"",
  phone:"",
  isadmin:false
  })
  const [Loading, setLoading]=useState(false)
    const context=useContext(MyContext);
    useEffect(() => {
    context.setisHeaderFooter(false);
    }, [])
    const changeInput=(e)=>{
      setformfield(()=>({
        ...formfield, [e.target.name]:e.target.value
      }
   

      ))
      console.log(formfield)
    }
    const signup=(e)=>{
      e.preventDefault();
      console.log(formfield);
      try{
        if(formfield.name===""){
          context.setalertbox({
                 msg:"name can't be blank",
            open:true,
            error:true,
       
          })
        }
        console.log(context.alertbox);
        if(formfield.email===""){
          context.setalertbox({
               msg:"email cant be blank",
            open:true,
            error:true,
          })
        }
        if(formfield.phone===""){
          context.setalertbox({
               msg:"email cant be blank",
            open:true,
            error:true,
          })
        }
        setLoading(true)
        PostData("/api/User/signup",formfield).then( async (res)=>{
      console.log(res);
          if( await res.success===true){
            context.setalertbox({
              open:true,
              error:false,
              msg:"Registered Succesfully"
            });
            localStorage.setItem("userEmail",formfield.email);
            setTimeout(()=>{
              setLoading(true)
              history("/verify")
            })
          }else{
            setLoading(false)
            context.setalertbox({
              open:true,
              error:true,
              msg:res.message
            });

          }
        })
      }catch(err){
        setLoading(false)
console.log(err)
context.setalertbox({
  open:true,
  error:true,
  msg:"Email is already exist"
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
       PostData("/api/User//loginwithgoogle",fields).then(  (res)=>{
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
  return (
    
    <section className="section signinPage signupPage">
    {/* <div className="shape-bottom">
        <svg fill='#fff' id="Layer_1" x="0px" y="0px" viewBox='00 2920 819.8' style={{enableBackground:"new 0 0 1921 819.8"}}
        ><path className='st0' d='M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z'></path></svg>
    </div> */}
  <div className="container">
    <div className=" box card p-3 shadow border-0" >
        <div className="text-center">
            <img src={Logo} alt="" className='img' />
        </div>
       <form >
     
          <div className="form-group mt-1">
          <h2>Sign up</h2> 
          <TextField id="standard-basic" label="Name" onChange={changeInput} name='name' type='text'  variant="standard" className='w-100' />
          </div>
          <div className="form-group">
          <TextField id="standard-basic" label="Email" onChange={changeInput}  type='email' name='email'  variant="standard" className='w-100' />

        
          </div>
          <div className="form-group">
          <TextField id="standard-basic" label="Phone" onChange={changeInput} type='text'  name='phone'  variant="standard" className='w-100' />

        
          </div>
          <div className="form-group">
          <TextField id="standard-basic" label="Password" onChange={changeInput}  type='password' name='password'  variant="standard" className='w-100' />

        
          </div>
       
        <div className="form-group d-flex">
     <Link className='w-100'> <button  onClick={signup} disabled={Loading===true? true:false}  className='bg-blue btn-lg  bg-big  col w-100' > {
      Loading===true ? <CircularProgress />:"Sign Up"
     }</button></Link>
    
  <Link to={"/"} className='w-100' ><button onClick={()=>context.setisHeaderFooter(true)} className=' bg-big  col w-100 ml-1' >Cancel</button></Link>
       
        </div>
        <div className="form-group">
          <p className='cursor'>Already Registered ?<Link to="/signin" className='border-effect '>Sign In
          </Link></p>
        </div>
        </form>
           <h6 className=' text-center font-weight-bold'>continue with Social Account</h6>
          <div className="">
            <button className='loginwithGoogle mt-1' onClick={signwithgoogle}>
              <img src={googlelogo} alt="" />Sign In with Google
            </button>
          </div>
    </div>
       </div>
   </section>
  )
}

export default Signup
