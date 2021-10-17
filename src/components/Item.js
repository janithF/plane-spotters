import React, {useContext, useState } from 'react';
import { ImLocation } from 'react-icons/im';
import { MdOutlineDateRange } from 'react-icons/md';
import { FiClock,FiMoreVertical } from 'react-icons/fi';
import airbus from '../assets/img/airbus.png';
import boeing from '../assets/img/boeing.png';
import '../styles/Item.scss'
import More from './More';
import AppContext from '../store/app-context';

const Item = (props) => {
    const { id,make, registration, model, date, time, location, itemImage } = props;
    const icon = make === "Airbus" ? airbus : boeing;//changing the icon of make
    const [isOpenMore,setIsOpenMore] = useState(false);//state for more menu
    
    
    //function to close the more menu
    const closeMoreMenu=()=>{
        setIsOpenMore(false);
    }
    
    return (
        <div className="item-card">
            <img src={itemImage} alt="item" className="item-img" />
            <div className="item-info-container">
                <div className="item-header">
                    <div className="identify">
                        <h3>{registration}</h3>
                        <p>{model}</p>
                        <img src={icon} alt="" />
                    </div>
                    {isOpenMore && <More closeMoreMenu={closeMoreMenu} id={id}/>}
                    <div className="more-btn" onClick={()=>setIsOpenMore(true)}>
                        <FiMoreVertical />
                    </div>
                </div>
                <div className="details">
                    <div className="first-row">
                        <p><MdOutlineDateRange />{date}</p>
                        <p><FiClock /> {time}</p>
                    </div>
                    <p className="location"><ImLocation />{location}</p>
                </div>
            </div>
        </div>
    );
};

export default Item;