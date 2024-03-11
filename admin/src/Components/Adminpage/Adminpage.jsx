import React from 'react'
import './Adminpage.css';
import arrow from '../../assets/arrow.png';
import { Link } from 'react-router-dom';
// import background from '../../assets/admin.jpeg';

const Adminpage = () => {
    return (
        <div className="container">
            <div className="image">
                <div className="main">
                    <h1>Welcome for the Admin User!</h1>
                    <p>Welcome menu for the admin user provides a convenient user interface for various
                        administration tasks. You can access the Welcome menu from any public or private page.</p>
                    <div className="button">
                        <Link to='#'><button>More Information <img src={arrow} alt="" /></button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adminpage
