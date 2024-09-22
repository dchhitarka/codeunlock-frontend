import React from 'react';
import '../../css/Loading.css';

export default function Loading(){
    return (
        <>
        <div className="loader-overflow"></div>
        <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
        </>
    )
}