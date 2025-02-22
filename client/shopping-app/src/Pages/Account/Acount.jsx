import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Tabs } from '@mui/material';

import {Tab} from '@mui/material';
import {TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { IoMdCloudUpload } from 'react-icons/io';

import { editData, fetchDataFromApi, uploadImage } from '../../utils/api';


function Account() {
    const [isLogin,setisLogin]=useState(false);
    const [isloading,setisloading]=useState(false);
    const [userdata,setuserdata]=useState([])
    const [previews,setpreviews]=useState(false)
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
      
      


   
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
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
      e.prevenDefault();
      console.log(fields)
      // formData.append('password',formfield.password);
      if(fields.oldPassword!=="" && fields.password!=="" && fields.confirmPassword!==""){
        console.log(fields)
      }
    }
  
  return (
          <section className="section myaccountPage">
  <div className="container mt-4">
<h2 className='hd'>My Account</h2>
<Box sx={{ width: '100%' }} className="myaccbox">
      <Box sx={{ borderBottom: 1, borderColor: 'divider'  }} >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Edit Profile" {...a11yProps(0)} />
          <Tab label="Change Password" {...a11yProps(1)} />
     
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
                            <TextField variant='outlined' className='w-100' label="Name" size='small' value={formfield.name} name="name" onChange={onchangeinput} />
                        </div>
                    </div> 
                      <div className="col-md-6">
                        <div className="form-group">
                            <TextField variant='outlined' className='w-100' label="Email" value={formfield.email} disabled size='small' name='email' onChange={onchangeinput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <TextField variant='outlined' className='w-100' label="Phone Number" value={formfield.phone} size='small' name='phone' onChange={onchangeinput} />
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
     
    </Box>
  </div>
      </section>
 
  )
}

export default Account
