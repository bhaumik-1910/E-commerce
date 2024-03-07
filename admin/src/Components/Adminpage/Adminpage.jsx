import React from 'react'
import './Adminpage.css';
import arrow from '../../assets/arrow.png';
import { Link } from 'react-router-dom';

const Adminpage = () => {
    return (
        <div className='container'>
            <div className="main">
                <h1>Welcome for the Admin User!</h1>
                <h4>Welcome menu for the admin user provides a convenient user interface for various
                    administration tasks. You can access the Welcome menu from any public or private page.</h4>
                <div className="button">
                    <Link to='#'><button>More Information <img src={arrow} alt="" /></button></Link>
                </div>
            </div>
        </div>
    )
}

export default Adminpage
