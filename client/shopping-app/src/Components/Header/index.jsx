import React, { useCallback, useContext, useEffect, useState } from 'react'
import Logo from "../../assets/images/logo.png"
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import Button from '@mui/material/Button';
import { LuUser } from "react-icons/lu";
import { IoBagOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import CountryDrop from './CountryDrop';
import { CiHome } from "react-icons/ci";
import { MyContext } from "../../App"
import { FaAngleRight } from "react-icons/fa";
import { fetchDataFromApi } from '../../utils/api';
import { SliderValueLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { FaClipboardCheck } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import Searchbox from '../../Pages/Search/Searchbox';

function Header() {
  const [subcat, setSubCat] = useState([])
  const [cartdata,setcartdata]=useState([]);

  useEffect(() => {
    setTimeout(() => {
      if(subcat.length===0){
        fetchDataFromApi("/api/subcat").then((res) => {
          setSubCat(res)
    
        })
      }
     
    }, 1000);
  
   
    const user=JSON.parse(localStorage.getItem("user"));
    let userId=user?.userId
     if(!user){
              
            }else{
              if(cartdata.length===0){
                fetchDataFromApi(`/api/cart/usercart/${userId}`).then((res)=>{
                  setcartdata(res);
                
          
              }).catch(err=>console.log(err))
              }

             
            }
      


  })
  const logout = () => {
    setAnchorEl(null)
    localStorage.clear();
    context.setIsLogin(false)
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const context = useContext(MyContext);
  const [isOpenSideval, setisOpenSideval] = useState(true)
  return (
    <div className='headerWrapper'>
      <div className="top-strip bg-purple ">
        <div className="container ">
          <p className="mb-0 mt-0 text-center " style={{ color: "white" }}>
            Due to the covid 19, orders may be proceeds with a delay
          </p>
        </div>
      </div>
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="logoWrapper col-sm-2 d-flex align-items-center">
              < img src={Logo} alt="Logo" />



            </div>
            <div className="col-sm-10 d-flex align-items-center part2">

              <CountryDrop />


              <Searchbox />
              <div className="part3 d-flex align-items-center ml-auto">
                {
                  context.IsLogin !== true ? <Link to={"/signin"} >   <button className='bg-blue BTM btn-round mr-2'>Sign In</button></Link> :
                    <>

                      <button onClick={handleClick} className='circle mr-3 ' ><LuUser /></button>
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                          paper: {
                            elevation: 0,
                            sx: {
                              overflow: 'visible',
                              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                              mt: 1.5,
                              '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                              },
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >

                        <Link to={"/myaccount"} style={{textDecoration:"none",color:"#000"}} >

                          <MenuItem onClick={handleClose}>

                            <Avatar />My Account

                          </MenuItem>
                        </Link>
                        <Divider />
                        <Link to={"/orders"} style={{textDecoration:"none",color:"#000"}} >

                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <FaClipboardCheck />

                            </ListItemIcon>
                            Orders


                          </MenuItem>
                        </Link>
                        <Link to={"/myList"} style={{textDecoration:"none",color:"#000"}}  >

                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <IoMdHeart />
                            </ListItemIcon>
                            My List
                          </MenuItem>
                        </Link>
                        <MenuItem onClick={logout}>
                          <ListItemIcon>
                            <MdOutlineLogout />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </>
                }

                <div className="ml-auto carttab d-flex align-items-center">
                  <span className="price">$3.37</span>

                  <div className="position-relative ml-2">
                    <Link to="/cart">
                      <button className='circle ' ><IoBagOutline /></button></Link>
                    <span className="count d-flex align-items-center justify-content-center">{cartdata.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav>
        <div className="container">
          <div className="row">
            {/* <div className="col-sm-3 navpart1">
              <div className="cartWrapper">
                <div className="allcattab align-items-center" onClick={() => {
                  console.log(isOpenSideval)
                  setisOpenSideval(!isOpenSideval)
                }
                }>
                  <span className='icon1 mr-2'><IoMdMenu /></span>
                  <button className='text'>ALL CATAGORIES
                    <span className='icon2 ml-2'><FaAngleDown /></span> </button>

                </div>
                <div className={`sidebarNav ${isOpenSideval === true ? "open" : ""}`} >
                  <ul>
                    <li><Link to="/"><Button>Men <FaAngleRight className='ml-auto' /> </Button></Link>
                      <div className="submenu d-flex " style={{ flexDirection: "column" }}>
                        <Link to="/"><Button>Clothing</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>

                      </div>  </li>
                    <li><Link to="/"><Button>Woman <FaAngleRight className='ml-auto' /> </Button></Link>
                      <div className="submenu d-flex " style={{ flexDirection: "column" }}>
                        <Link to="/"><Button>Clothing</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>

                      </div>
                    </li>
                    <li><Link to="/"><Button>Beauty <FaAngleRight className='ml-auto' /> </Button></Link>
                      <div className="submenu d-flex " style={{ flexDirection: "column" }}>
                        <Link to="/"><Button>Clothing</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>

                      </div>  </li>
                    <li><Link to="/"><Button>Wathes <FaAngleRight className='ml-auto' /> </Button></Link>
                      <div className="submenu d-flex " style={{ flexDirection: "column" }}>
                        <Link to="/"><Button>Clothing</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>

                      </div>  </li>
                    <li><Link to="/"><Button>kids <FaAngleRight className='ml-auto' /> </Button></Link>
                      <div className="submenu d-flex " style={{ flexDirection: "column" }}>
                        <Link to="/"><Button>Clothing</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>

                      </div>  </li>
                    <li><Link to="/"><Button>Gift <FaAngleRight className='ml-auto' /> </Button></Link>
                      <div className="submenu d-flex " style={{ flexDirection: "column" }}>
                        <Link to="/"><Button>Clothing</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>

                      </div>  </li>
                    <li><Link to="/"><Button>Beauty <FaAngleRight className='ml-auto' /> </Button></Link>
                      <div className="submenu d-flex " style={{ flexDirection: "column" }}>
                        <Link to="/"><Button>Clothing</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>

                      </div>  </li>
                    <li><Link to="/"><Button>Wathes <FaAngleRight className='ml-auto' /> </Button></Link>
                      <div className="submenu d-flex " style={{ flexDirection: "column" }}>
                        <Link to="/"><Button>Clothing</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>

                      </div>  </li>
                    <li><Link to="/"><Button>kids <FaAngleRight className='ml-auto' /> </Button></Link>
                      <div className="submenu d-flex " style={{ flexDirection: "column" }}>
                        <Link to="/"><Button>Clothing</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>

                      </div>  </li>
                    <li><Link to="/"><Button>Gift <FaAngleRight className='ml-auto' /> </Button></Link>
                      <div className="submenu d-flex " style={{ flexDirection: "column" }}>
                        <Link to="/"><Button>Clothing</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>
                        <Link to="/"><Button>Footwear</Button></Link>
                        <Link to="/"><Button>Watches</Button></Link>

                      </div>  </li>
                  </ul>

                </div>
              </div>
            </div> */}
            <div className="col-sm-9 navpart2 d-flex align-item-center">
              <ul className='list list-inline ml-auto'>
                <li className='list-inline-item' >

                  <Link to="/"><Button >Home</Button></Link>
                </li>
                {Array.isArray(subcat) &&
                  subcat?.length !== 0 && subcat?.map((item, index) => {
                    return (
                      <li key={index} className='list-inline-item' >

                        <Link to={`/subcat/${item?.id}`}><Button style={{ flexDirection: "column" }}>{item.subCat}</Button></Link>

                      </li>
                    )
                  })}
          


              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
