import React from 'react';
import navlogo from '../../assets/nav-logo.svg';
// import navProfile from '../../assets/nav-profile.svg';
import { Link, Outlet } from 'react-router-dom';
import { RiAdminFill } from "react-icons/ri";

const Navbar = () => {
    return (
        <>
            <div className='navbar'>
                <div className="nav-logo">
                    <Link to='/'><img src={navlogo} alt="" /></Link>
                </div>

                {/* <div className="nav-login-cart">
                    {localStorage.getItem('aut-token')
                        ? <button onClick={() => { localStorage.removeItem('aut-token'); window.location.replace('/') }}>Logout</button>
                        : <></>}
                </div> */}
             

                <div className="dropdown">
                    <div className="dropbtn">
                        {localStorage.getItem('aut-token')
                            ? <RiAdminFill onClick={() => { localStorage.removeItem('aut-token');}}></RiAdminFill>
                            : <></>}
                    </div>
                    <div className="dropdown-content">
                        {localStorage.getItem('aut-token')
                            ? <a href="#" onClick={() => { localStorage.removeItem('aut-token'); window.location.replace('/') }}>Admin</a>
                            : <></>}
                        {localStorage.getItem('aut-token')
                            ? <a href="#" onClick={() => { localStorage.removeItem('aut-token'); window.location.replace('/') }}>Logout</a>
                            : <></>}
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navbar
//<Link to='/login'><button>Login</button></Link>
//<RiAdminFill />