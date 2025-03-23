import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdDeleteForever } from "react-icons/md";
import { CircularProgress, Tabs } from '@mui/material';
import emptycart from "../../assets/images/empty-cart.png"
import {Tab} from '@mui/material';
import {TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { IoMdCloudUpload } from 'react-icons/io';
import { deleteData, editData, fetchDataFromApi, uploadImage } from '../../utils/api';
import { MyContext } from '../../App';
import {Rating} from '@mui/material';
import { MdOutlineEdit } from "react-icons/md";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Account() {
  const [Reviewdata,setReviewData]=useState([]);
  const context=useContext(MyContext);
    const [isLogin,setisLogin]=useState(false);
    const [isloading,setisloading]=useState(false);
    const [userdata,setuserdata]=useState([])
    const [previews,setpreviews]=useState(false)
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [formfield,setformfield]=useState({
        name:"",
        email:"",
        phone:"",
        images:[],
    })
    const [fields,setfields]=useState({
      oldPassword:"",
      password:"",
      confirmPassword:""

    })
    const onchangeinput=(e)=>{
        setformfield(()=>({
            ...formfield,[e.target.name]:e.target.value
        }))
    }
    const onchangeinput2=(e)=>{
      console.log(e.target.value)
      setfields(()=>({
          ...fields,[e.target.name]:e.target.value
      }))
  }
    const history=useNavigate();
  const onchangfile=(e)=>{

  }

    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(token!=="" && token!==undefined && token!==null){
            setisLogin(true)
        }else{
            setisLogin(false)
            history("/signin");
        }
        const user=JSON.parse(localStorage.getItem("user"));
        fetchDataFromApi(`/api/User/${user?.userId}`).then((res)=>{
            setuserdata(res);
            setpreviews(res.images);
            setformfield({
                name:res.name,
                email:res.email,
                phone:res.phone
            })
        })
        setTimeout(()=>{
     const id=user.userId;
     if(!Reviewdata.reviews){
      fetchDataFromApi(`/api/review/usersreview/${id}`).then((res)=>{
        console.log(res);
          setReviewData(res);
       
         })
     }

        },2000)
    })
    const edituser=(e)=>{
        e.prevenDefault();
        const appendedArray=[...previews,...uniquearray];
        img_arr=[];
        formData.append('name',formfield.name);
        formData.append('email',formfield.email);
        formData.append('phone',formfield.phone);
        formData.append('images',appendedArray);
        formfield.images=appendedArray
        if(formfield.name!=="" && formfield.email!=="" && previews.length!==0){
          const user=JSON.parse(localStorage.getItem("user"));
          editData(`/api/User/${user.userId}`,formfield).then((res)=>{
            console.log("hii")
          })
        }
        
    }
    const changepassword=(e)=>{
      e.preventDefault();
      console.log(fields)
      // formData.append('password',formfield.password);
      if(fields.oldPassword!=="" && fields.password!=="" && fields.confirmPassword!==""){
      // console.log(fields)
  if(fields.password!==fields.confirmPassword){
 return   context.setalertbox({
      msg:"Please check the confirm password",
 open:true,
 error:true,

})
  }
  const user=JSON.parse(localStorage.getItem("user"));
  fetchDataFromApi(`/api/User/${user?.userId}`).then((res)=>{
   const data={
        name:res.name,
        email:res.email,
        phone:res.phone,
        password:fields.oldPassword,
        newpass:fields.confirmPassword,
        images:formfield.images
   }
  editData(`/api/User/changepassword/${user?.userId}`,data).then((res)=>{
    console.log(res);
   if(res.success===true){
   return context.setalertbox({
      msg:"Password changed Succesfully",
 open:true,
 error:false,

})
   }else{
  return  context.setalertbox({
      msg:res.message,
 open:true,
 error:true,

})
   }

  }).catch((err)=>{
    console.log(err)
    context.setalertbox({
      msg:"something went wrong",
 open:true,
 error:true,

})
  })
})
}else{
        context.setalertbox({
          msg:"Please fill the required things",
     open:true,
     error:true,
  
   })
      }
    }
    function formatDate(isoString) {
      const date = new Date(isoString);
      const options = { month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
  }
  const deletereview=(id)=>{
deleteData(`/api/review/${id}`).then(()=>{
   context.setalertbox({
    msg:"Review deleted sucesfully",
open:true,
error:false,

})
fetchDataFromApi(`/api/review/usersreview/${id}`).then((res)=>{
  console.log(res);
    setReviewData(res);
 
   })

}).catch((err)=>{
  console.log(err)
  context.setalertbox({
    msg:"something went wrong ",
open:true,
error:false,

})
})
  }
  return (
          <section className="section myaccountPage">
  <div className="container mt-4">
<h2 className='hd'>My Account</h2>
<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Edit Profile" {...a11yProps(0)} />
          <Tab label="Change Password" {...a11yProps(1)} />
          <Tab label="Your Activity" {...a11yProps(2)} />
    
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <form onSubmit={edituser} >
        <div className="d-flex">
            <div className="col-md-4">
                <div className="userImage">
                    <img src="" alt="" />
                    <div className="overlay d-flex align-items-center justify-content-center">
                        <IoMdCloudUpload />
                        <input type='file' onChange={(e)=>onchangfile(e,'/api/User/upload')} name="images" />
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <TextField variant='outlined' className='w-100' label="Name"  size='small'  name="name" onChange={onchangeinput} />
                        </div>
                    </div> 
                      <div className="col-md-6">
                        <div className="form-group">
                            <TextField variant='outlined' className='w-100' label="Email" value={formfield.email} disabled size='small' name='email' onChange={onchangeinput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <TextField variant='outlined' className='w-100' label="Phone Number" size='small' name='phone' onChange={onchangeinput} />
                        </div>
                    </div>
                 
                </div>
                <div className="col-md-6">
                        <div className="form-group">
                       <button type='submit' className='bg-blue btn-lg  bg-big'>Save</button>
                        </div>
                    </div>
            </div>
        </div>
        </form>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <form  >
        <div className="d-flex">
           
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                

                        <TextField  label="Old Password" className='w-100' name='oldPassword' variant="outlined" onChange={onchangeinput2} size='small' value={fields.oldPassword}  />

                        
                        </div>
                    </div> 
                      <div className="col-md-4">
                        <div className="form-group">
                            <TextField variant='outlined' className='w-100' label="New Passwprd" value={fields.password} name='password'  onChange={onchangeinput2}  size='small' />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <TextField variant='outlined' className='w-100' name='confirmPassword' value={fields.confirmPassword}  onChange={onchangeinput2}  label="Confirm Password" size='small' />
                        </div>
                    </div>
                 
                </div>
                <div className="col-md-6">
                        <div className="form-group">
                       <button  onClick={changepassword} className='bg-blue btn-lg  bg-big'>Save</button>
                        </div>
                    </div>
            </div>
        </div>
        </form>
      </CustomTabPanel>
    <CustomTabPanel value={value} index={2} >
<div className=" container">
{ 
Reviewdata && Reviewdata.reviews && Reviewdata?.reviews?.length!==0 &&
  Reviewdata.reviews.map((review, index) =>{
    return <div className="d-flex" key={index}>
      <div className="imges m-auto">
        <img 
          src={review.product?.images[0] || emptycart} 
          alt={review.product?.name || "No Image"} 
          style={{ width: "70px", height: "70px" }} 
        />
      </div>
      <div className="productName m-auto">
        <h6>{review.product?.name.substr(0,30) + "......" || "Product Name"}</h6>
        <span className='d-flex'> <b>Brand :</b>{review.product?.brand || "Brand"}</span>
      </div>
      <div className="price m-auto ">
        ${review.product?.price || "N/A"}
      </div>
      <div className="rating m-auto">
        <Rating value={review.customerRating || 0} readOnly small />
        <div className="date">{formatDate(review?.dataCreated)}</div>
      </div>
 
     <Link to={`/myaccount/editreview/${review?._id}`} style={{color:"#000"}} className='m-auto'>
     <MdOutlineEdit  className='' style={{cursor:"pointer"}}  />
     </Link>
     <div className='m-auto'>
     <MdDeleteForever onClick={()=>deletereview(review?._id)} className='m-auto cursor-pointer' style={{cursor:"pointer"}} />
     </div>
  

    </div>
  })
}

{/* {
!Reviewdata && Reviewdata.reviews && <CircularProgress />
} */}
{
  Reviewdata.length===0 && <img src={emptycart} alt="" />
}


</div>
    </CustomTabPanel>
    </Box>


  </div>
      </section>
 
  )
}

export default Account
