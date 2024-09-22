import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchSearch } from '../../api/ActionCreators';
import UserAuth from '../../auth/UserAuth';
import { useUserContext } from '../../context/UserContext';
import '../../css/Auth.css';
import '../../css/fontawesome/css/all.css';
import '../../css/Navigation.css';
import { useNavbarToggle } from '../../hooks/Hooks';
import logo from '../../images/codeunlock.png';

function searchResultHTML(posts){
    return posts.map(post => {
        return `
            <a href="/posts/${post.post_slug}" class="search__result">
                <strong>${post.post_title}</strong>
            </a>
        `
    }).join('');
}

function fetchSearchResult(searchInput, searchResults){
    searchInput.addEventListener('input', async function(){
        if(!this.value){
            searchResults.style.display = "none";
            return;
        }
        searchResults.style.display = "block";
        searchResults.innerHTML = '';

        const res = await fetchSearch(this.value);
        if(res.length > 0){
            searchResults.innerHTML = searchResultHTML(res);
            return;
        }
        searchResults.innerHTML = `<div class="search__result">No result found for ${this.value}!</div>`;
    })

    searchInput.addEventListener('keyup', e => {
        if(![13,38,40].includes(e.keyCode)){
            return;
        }
        const activeClass = "search__result--active";
        const current = document.querySelector(`.${activeClass}`);
        const items = document.querySelectorAll('.search__result');
        let next;
        if(e.keyCode === 40 && current){
            next = current.nextElementSibling || items[0];
        }
        else if(e.keyCode === 40){
            next = items[0];
        }
        else if(e.keyCode === 38 && current){
            next = current.previousElementSibling || items[items.length - 1];
        }
        else if(e.keyCode === 38){
            next = items[items.length - 1];
        }
        else if(e.keyCode === 13 && current.href){
            window.location = current.href;
            return;
        }
        current && current.classList.remove(activeClass);
        next.classList.add(activeClass);
    })
}

export default function Header(){
    const {user, setUser} = useUserContext({})
    const [hambar, setHamBar] = useState("ham-bar");
    const [isVisible, setVisible] = useNavbarToggle(false);
    const [navVisibility, setNavVisibility] = useState("hide")

    useEffect(() => {
        const authenticateUser = async () => {
            const userObj = await UserAuth.authenticate();
            if(userObj.isAuthenticated){
                setUser(userObj);
            }
        }
        authenticateUser();
    }, [])

    // const history = useNavigate()

    const toggleMenu = () => {
        let newClass = hambar === "ham-bar" ? "ham-bar rotate" : "ham-bar";
        setHamBar(newClass)
        if(isVisible){
            setVisible(false)
            document.body.style.overflowY = "auto";
        }
        else{
            setVisible(true)
            document.body.style.overflowY = "hidden";
        }
    }
     
    const showSearchStyle = {
        display: "flex",
        justifyContent: "flex-start",
        position: "fixed",
        width: "100%",
        top: "0",
        height: "50px",
        zIndex: "1000",
        backgroundColor: "white",
        margin: "4px"
    }
    const hideSearchStyle = {
        display: "none",
        zIndex: "1000",
    }

    const [mobileSearch, setMobileSearch] = useState(hideSearchStyle);

    const displaySearchPage = () => {
        if(document.querySelector('.search.mobile').style.display === 'none'){
            setMobileSearch(showSearchStyle)
        }
        else{
            setMobileSearch(hideSearchStyle)
            document.querySelector('.search-section .search__results').innerHTML = "";
        }        
    }
    
    useEffect(() => {
        setNavVisibility(() => isVisible ? "show" : "hide");
        setHamBar(() => isVisible ? "ham-bar rotate" : "ham-bar")
        document.body.style.overflowY = isVisible ? "hidden" : "auto";
    }, [isVisible])

    return (
        <>
        <header className="topbar" style={{display: "flex", alignItems: "center"}}>
            <div className="overlay" 
                 style={{
                    position: "fixed",
                    top: "72px",
                    left: "0",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    width: "100vw",
                    height: "100vh",
                    zIndex: "1000",
                    display: navVisibility === "show" ? "block" : "none"
                }}>
            </div>
            <div className="topleft">
                {/* Hamburger Icon */}
                <div className={hambar} 
                    onClick={toggleMenu} style={{zIndex: "1000"}}>
                    <span className="ham1"></span>
                    <span className="ham2"></span>
                    <span className="ham3"></span>
                </div>
                {/* LOGO */}
                <Link to="/" className="logo-link">
                    <div className="logo" style={{display: 'flex', alignItems: 'center'}}>
                        <img src={logo} alt="Logo" style={{borderRadius: "5px", marginTop: "2px"}} width="150px" />
                        {/* <div style={{fontWeight: "900", marginLeft: '4px'}}>CodeUnlock</div> */}
                    </div>
                </Link>
            </div>
            
            {/* SEARCH BAR */}
            <div className="topmiddle desktop">
                <div className="search">
                    <i className="fas fa-search desktop-search-icon"></i>
                    <input type="search" name="search" className="search__input" placeholder="Search Post by title or body..." onClick={() => fetchSearchResult(document.querySelector('.search__input'), document.querySelector('.search__results'))}/>
                </div>
                <div style={{position: "relative"}}>
                    <div className="search__results"></div>
                </div>
            </div>

            <div className="topmiddle mobile">
                <div className="searchicon" onClick={displaySearchPage}>
                    <i className="fas fa-search"></i>
                </div>
            </div>

            {/* PROFILE */}
            {user.isAuthenticated && (
                <div className="header-right" style={{position: "relative", width: "50px"}}                        
                    // onTouchStart={() => {
                    //     console.log("Touched")
                    //     document.querySelector(".user-header").classList.add("hidden")
                    //     document.querySelector(".user-header").classList.remove("visible")
                    // }}
                    // onClick={() => {
                    //     document.querySelector(".user-header").classList.toggle("hidden")
                    //     document.querySelector(".user-header").classList.toggle("visible")
                    // }}
                    // onMouseOver={() => {
                    //     if(window.innerWidth >= "768"){
                    //         document.querySelector(".user-header").classList.remove("hidden")
                    //         document.querySelector(".user-header").classList.add("visible")
                    //     }
                    // }}
                    // onMouseOut={() => {
                    //     if(window.innerWidth >= "768"){
                    //         document.querySelector(".user-header").classList.add("hidden")
                    //         document.querySelector(".user-header").classList.remove("visible")
                    //     }
                    // }}
                >
                    <Link to="/u/dashboard"><img src={user.avatar} alt="Avatar" className="avatar user-image" width="30" height="30"/></Link>
                    {/* <ul className="user-header hidden">
                        <li onClick={() => alert(`Hello, ${user.name}`)}>Hello, {user.name}</li>
                        <li onClick={() => alert(`Notifications - 0`)}>Notifications - 0</li>
                        <li onClick={() => {
                            setVisible(false)
                            user.logout()
                            window.location.replace("/")
                        }}>
                            Logout
                        </li>
                    </ul> */}
                </div>
            )}

            {/* AUTH BUTTONS */}
            {!user.isAuthenticated && window.innerWidth > 767 && (
                <div className="header-right login-header">
                <Link to="/u/login"><button className="form-button login-button active-button">LOGIN</button></Link>
                {/* <Link to="/register"><button className="form-button register-button unactive-button">REGISTER</button></Link>                 */}
                </div>
            )}

            {/* NAVBAR */}
            <nav id="flyoutMenu" className={navVisibility}>
                <ul className="menu-list">
                    {/* IF USER IS LOGGED IN */}
                    {user.isAuthenticated && (
                        <>
                        <Link to="/u/dashboard">
                            <li className="menu-item user-profile" onClick={() => setVisible(false)}>
                                <img src={user.avatar} alt="Avatar" className="avatar user-image" width="30" height="30"/>
                                <div className="username">{user.name}</div>
                            </li>
                        </Link>
                        <Link to="/"><li onClick={() => setVisible(false)} className="menu-item"><i className="fas fa-home"></i>HOME</li></Link>
                        <Link to="/posts"><li onClick={() => setVisible(false)} className="menu-item"><i className="fas fa-list-alt"></i>POSTS</li></Link>
                        <Link to="/tags"><li onClick={() => setVisible(false)} className="menu-item"><i className="fas fa-tags"></i>TAGS</li></Link>
                        <Link to="/my/bookmarks"><li onClick={() => setVisible(false)} className="menu-item"><i className="fas fa-bookmark"></i>BOOKMARKS</li></Link>
                        <Link to="/my/likes"><li onClick={() => setVisible(false)} className="menu-item"><i className="fas fa-thumbs-up"></i>LIKES</li></Link>
                        {/* <Link to="/posts"><li onClick={() => setVisible(false)} className="menu-item"><i className="fas fa-comments"></i>COMMENTS</li></Link> */}
                        {parseInt(user.isAdmin) === 1 && (<Link to="/admin"><li onClick={() => setVisible(false)} className="menu-item"><i className="fas fa-user-lock"></i>ADMIN</li></Link>)}
                        <Link to="/"><button 
                            onClick={async () => {
                                setVisible(false)
                                await UserAuth.logout()
                                window.location.replace("/")
                            }} 
                            className="form-button logout-button active-button">LOGOUT</button></Link>
                        </>
                    )}
                    {/* ELSE */}
                    {!user.isAuthenticated && (
                        <>
                            <Link to="/"><li onClick={() => setVisible(false)} className="menu-item"><i className="fas fa-home"></i>HOME</li></Link>
                            <Link to="/posts"><li onClick={() => setVisible(false)} className="menu-item"><i className="fas fa-th-list"></i>POSTS</li></Link>
                            <Link to="/tags"><li onClick={() => setVisible(false)} className="menu-item"><i className="fas fa-hashtag"></i>TAGS</li></Link>
                            <Link to="/u/login"><button onClick={() => setVisible(false)} className="form-button logout-button active-button">LOGIN</button></Link>
                            <Link to="/u/register"><button onClick={() => setVisible(false)} className="form-button nav-reg-button unactive-button">REGISTER</button></Link>
                        </>
                    )}

                </ul>
            </nav>
        </header>
        <div className="search-section">
            <div className="mobile search" style={mobileSearch}>
                <input type="search" name="search" className="search__input" placeholder="Search Post by title or body..." onClick={() => fetchSearchResult(document.querySelector('.mobile .search__input'), document.querySelector('.search-section .search__results'))}/>
                <button className="search__hide" onClick={displaySearchPage}>&times;</button>
                {/* </div> */}
            </div> 
            <div className="search__results mobile_search__results"></div>
        </div>
        </>
    )
}
