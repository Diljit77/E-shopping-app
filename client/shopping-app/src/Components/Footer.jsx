import React from 'react'
import { LuShirt } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiDiscount1 } from "react-icons/ci";
import { CiBadgeDollar } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="topInfo row">
                    <div className="col d-flex align-items-center">
                        <span><LuShirt /></span>
                        <span>Everyday Fresh Products</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><CiDeliveryTruck /></span>
                        <span>Free delivery over $50</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><CiDiscount1 /></span>
                        <span>Daily Mega Discount</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><CiBadgeDollar /></span>
                        <span>Best price on Market</span>
                    </div>
                </div>
                <div className="row mt-4 linksWrap">
                    <div className="col">
                    <h5>Fruits & Vegitable</h5>
                       <ul>
                        
                        <li><Link to="#" >Fresh Vegitable</Link></li>
                        <li><Link to="#" >Herbs & Seasonings</Link></li>
                        <li><Link to="#" >Fresh Fruits</Link></li>
                        <li><Link to="#" >Cuts & Sprouts</Link></li>
                        <li><Link to="#" >Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#" >Packaged Produce</Link></li>
                        <li><Link to="#">Party Trays</Link></li>
                       </ul>
                    </div>
                    <div className="col">
                    <h5>BREAKFAST & DAIRY</h5>
                       <ul>
                        
                        <li><Link to="#" >Fresh Vegitable</Link></li>
                        <li><Link to="#" >Herbs & Seasonings</Link></li>
                        <li><Link to="#" >Fresh Fruits</Link></li>
                        <li><Link to="#" >Cuts & Sprouts</Link></li>
                        <li><Link to="#" >Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#" >Packaged Produce</Link></li>
                        <li><Link to="#">Party Trays</Link></li>
                       </ul>
                    </div>
                    <div className="col">
                    <h5>MEAT & SEAFOOD</h5>
                       <ul>
                        
                        <li><Link to="#" >Fresh Vegitable</Link></li>
                        <li><Link to="#" >Herbs & Seasonings</Link></li>
                        <li><Link to="#" >Fresh Fruits</Link></li>
                        <li><Link to="#" >Cuts & Sprouts</Link></li>
                        <li><Link to="#" >Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#" >Packaged Produce</Link></li>
                        <li><Link to="#">Party Trays</Link></li>
                       </ul>
                    </div>
                    <div className="col">
                    <h5>BEVERAGES</h5>
                       <ul>
                        
                        <li><Link to="#" >Fresh Vegitable</Link></li>
                        <li><Link to="#" >Herbs & Seasonings</Link></li>
                        <li><Link to="#" >Fresh Fruits</Link></li>
                        <li><Link to="#" >Cuts & Sprouts</Link></li>
                        <li><Link to="#" >Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#" >Packaged Produce</Link></li>
                        <li><Link to="#">Party Trays</Link></li>
                       </ul>
                    </div>
                    <div className="col">
                    <h5>BREADS & BAKERY</h5>
                       <ul>
                        
                        <li><Link to="#" >Fresh Vegitable</Link></li>
                        <li><Link to="#" >Herbs & Seasonings</Link></li>
                        <li><Link to="#" >Fresh Fruits</Link></li>
                        <li><Link to="#" >Cuts & Sprouts</Link></li>
                        <li><Link to="#" >Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#" >Packaged Produce</Link></li>
                        <li><Link to="#">Party Trays</Link></li>
                       </ul>
                    </div>
                </div>
                <div className="copyright mt-3 pt-3 pb-3 d-flex ">
<p className='mb-0'> Copyright 2024. All rights reserved</p>
<ul className='list  list-inline ml-auto mb-0'>
<li className='list-inline-item'>
    <Link to="#" >
    <FaFacebookF />
    </Link>
</li>
<li className='list-inline-item'>
    <Link to="#" >
    <FaTwitter />
    </Link>
</li>
<li className='list-inline-item'>
    <Link to="#" >
    <FaInstagram />
    </Link>
</li>

</ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
