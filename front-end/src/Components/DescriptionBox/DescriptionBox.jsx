import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>Am e-commerce website in an online platform that facilitates the buying and selling of product or services over the internet.It server as a virtual marketplace where businesses and individuals can showcase their paroducts,interact with customers,and conduct transaction the need for a physical presence.E-commerce website have gained have immense popularity due to their convenience,accessiblity,and the global reach they offer.</p>
                <p>E-commerce website typically display products or services along with detailed descriptions,images,prices,and any available variations(e.g.sizes,colors).Each product usually has its own dedicated page with relevent information.</p>
            </div>
        </div>
    )
}

export default DescriptionBox
