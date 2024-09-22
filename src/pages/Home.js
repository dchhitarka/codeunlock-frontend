import React from 'react';
import { Link } from 'react-router-dom';
import { LatestPost } from '../components/Posts/PostViewToggle';
import { useUserContext } from '../context/UserContext';
import '../css/Home.css';

export default function Home(){
    // usePageTracking();

    document.title = "Home - CodeUnlock.in | The next gen blog. ";
    const { user } = useUserContext();
    
    return (
        <div className="home">
            <section className="top">
                <div className="tagline">The next generation blog for the next generation devel&lt;&gt;pers!</div>
                <div className="info">The final destination for your queries regarding Python, JavaScript, PHP, Web Development, Data Structures, Algorithms and much more.</div>
                <div className="actions">
                {
                    !user.isAuthenticated  
                    && 
                    <>
                        <Link to='/u/register'><button className="register-home">Get Started</button></Link>
                        <p className="login">Already have an account? <Link to='/u/login'>Login</Link></p>        
                    </>
                }
                </div>
            </section>
            <section>
                <div className="view-post">
                    <span className="latest">Latest</span>
                    <span className="divide">|</span> 
                    <Link className="all" to='/posts'><span>All</span></Link>
                </div>
                <LatestPost />
            </section>
        </div>
    )
}