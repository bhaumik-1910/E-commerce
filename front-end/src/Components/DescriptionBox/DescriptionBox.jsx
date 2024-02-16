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
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Error officiis praesentium asperiores vitae excepturi officia,
                    nemo eligendi animi iusto facere deleniti pariatur aspernatur
                    autem? Amet quaerat doloribus., quos dignissimos facilis,
                    accusamus incidunt omnis optio neque fuga vitae hic velit
                    rerum fugiat ratione. Ullam placeat.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti qui
                    minima consequuntur, maxime similique ullam placeat excepturi asperiores
                    ipsa laboriosam distinctio, aliquid!</p>
            </div>
        </div>
    )
}

export default DescriptionBox
