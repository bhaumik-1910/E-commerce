import React from 'react';
import navlogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/nav-profile.svg';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <div className='navbar'>
                <div className="nav-logo">
                    <Link to='/'><img src={navlogo} alt="" /></Link>
                </div>
                <div className="nav-login-cart">
                    {localStorage.getItem('aut-token')
                        ? <button onClick={() => { localStorage.removeItem('aut-token'); window.location.replace('/') }}>Logout</button>
                        : <Link to='/login'><button>Login</button></Link>}
                </div>
                <img src={navProfile} className="nav-profile" alt="" />
            </div>
            <Outlet />
        </>
    )
}

export default Navbar
