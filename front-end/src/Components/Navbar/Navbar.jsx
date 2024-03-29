//rafce
import React, { useContext, useRef, useState } from 'react'
import './Navbar.css';
//image
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, Outlet } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
// import nav_dropdown from '../Assets/nav_dropdown.png';

const Navbar = () => {

  //useState  
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRaf = useRef();

  // let imgx = document.getElementById("img");
  // const dropdown_toggle = (e) => {
  //   //menuRaf.current.classList.toggle('nav-menu-visible');
  //   e.target.classList.toggle('open');

  //   if (e.target === 'img.nav-dropdown') {
  //     imgx.classList.add("nav-menu-visible");
  //   } else {
  //     imgx.classList.remove("nav-menu-visible");
  //   }
  // }

  return (
    <>
      <div className='navbar'>
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>SHOPPER</p>
        </div>
        {/* toggle image */}
        {/* <img className='nav-dropdown' id='img' onClick={dropdown_toggle} src={nav_dropdown} alt="" /> */}
        <ul raf={menuRaf} className="nav-menu">
          <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to="/">Shop</Link> {menu === 'shop' ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none' }} to="/mens">Men</Link> {menu === 'mens' ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none' }} to="/womens">Women</Link> {menu === 'womens' ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to="/kids">Kids</Link> {menu === 'kids' ? <hr /> : <></>}</li>
        </ul> 
        <div className="nav-login-cart">
          {localStorage.getItem('aut-token')
            ? <button onClick={() => { localStorage.removeItem('aut-token'); window.location.replace('/') }}>Logout</button>
            : <Link to='/login'><button>Login</button></Link>}
          <Link to='/cart'><img src={cart_icon} alt="" /></Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navbar
