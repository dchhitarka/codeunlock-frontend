import React from 'react';
import '../../css/Popup.css';

export default function Popup({message, type}){
    if (message.includes('Successfully')) message = 'Post ' + message.split(' ')[1];
    return (
        <div className="inner">
            <div className="flash-messages">
                <div className={`flash flash--${type}`}>
                    <p className="flash__text">{message}</p>
                    <button className="flash__remove" onClick={e => e.target.parentNode.parentNode.remove()}>&times;</button>  
                </div>
            </div>
        </div>          
    )
}