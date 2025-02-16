import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IoMdCloudUpload } from 'react-icons/io';
import { TextField } from '@mui/material';
import { fetchDataFromApi, uploadImage } from '../../utils/api';


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
    
    const onchangeinput=(e)=>{
        setformfield(()=>({
            ...formfield,[e.target.name]:e.target.value
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
                    <img src="https://mironcoder-hothash.netlify.app/images/avatar/01.webp" alt="" />
                    <div className="overlay d-flex align-items-center justify-content-center">
                        <IoMdCloudUpload />
                        <input type='file' />
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
      <form >
        <div className="d-flex">
           
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <TextField variant='outlined' className='w-100' label="Name" size='small' />
                        </div>
                    </div> 
                      <div className="col-md-4">
                        <div className="form-group">
                            <TextField variant='outlined' className='w-100' label="Email" disabled size='small' />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <TextField variant='outlined' className='w-100' label="Phone Number" size='small' />
                        </div>
                    </div>
                 
                </div>
                <div className="col-md-6">
                        <div className="form-group">
                       <button className='bg-blue btn-lg  bg-big'>Save</button>
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
