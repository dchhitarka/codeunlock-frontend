import React from 'react';
import { Link } from 'react-router-dom';
import error from '../images/404-error.png';

function NotFound404(){
    return (
        <div className="not-found">
            {/* <img src={error} width="200" height="200"/> */}
            <div>Go back to <Link to='/'>Home</Link> Page</div>
        </div>
    )
}

export default NotFound404;