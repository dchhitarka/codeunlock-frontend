import React, { useEffect } from 'react';
import {useNavbarToggle} from '../Hooks';
import { Link } from 'react-router-dom';
import '../../css/Navigation.css';
import '../../css/Auth.css'

function Navbar(){
    const [isVisible, setVisible] = useNavbarToggle();
 
    const toggleMenu = () => {
        if(isVisible) setVisible(false)
        else setVisible(true)
    }
    let visibility = "hide"
    
    useEffect(() => {
        visibility = isVisible ? "show" : "hide"
    }, [isVisible])
    
    return (
        <nav id="flyoutMenu"
            onTouchEnd={() => setVisible(false)}
            onClick={toggleMenu} 
            className={visibility}
        >
            <ul className="menu-list">
                <Link to="/posts"><li className="menu-item">POSTS</li></Link>
                <Link to="/login"><li className="menu-item">CATEGORIES</li></Link>
                <Link to="/about"><li className="menu-item">ABOUT</li></Link>
                <Link to="/contact"><li className="menu-item">CONTACT</li></Link>
            </ul>
        </nav>
    )
}

export default Navbar;