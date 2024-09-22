import React, { Suspense, lazy } from 'react';
import ReactGA from 'react-ga-neo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/index.css';

import Loading from './components/Utility/Loading';

import AuthRoute from './components/Auth/AuthRoute';
import { RequiredAuth } from './components/Routes';
import { UserContextProvider } from './context/UserContext';

// // ADMIN PAGES
const AdminRoute = lazy(() => import('./pages/admin/index'));

// // POST PAGES
const Posts = lazy(() => import('./pages/posts/index'));
const Post = lazy(() => import('./pages/posts/Post'));
const BookmarkedPosts = lazy(() => import('./pages/posts/Bookmarks'));
const LikedPosts = lazy(() => import('./pages/posts/Likes'));

// // TAG PAGES
const Tags = lazy(() => import('./pages/tags/index'));
const Tag = lazy(() => import('./pages/tags/Tag'));

// // OTHER PAGES
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// LAYOUT COMPONENTS
const Header = lazy(() => import('./components/Utility/Header'));
const Footer = lazy(() => import('./components/Utility/Footer'));


function initialiseAnalytics() {
    const TRACKING_ID = "UA-179116638-1";
    ReactGA.initialize(TRACKING_ID, { debug: false });
}


function App(props) {
    window.scroll({ top: 0, behavior: 'smooth' })

    const footerStyle = {
        zIndex: "120",
        position: "fixed",
        bottom: "10px",
        right: "5px",
        backgroundColor: "var(--secondary)",
        color: "white",
        padding: "8px",
        fontSize: "20px",
        borderRadius: "4px",
        cursor: "pointer"
    }
    return (
      <BrowserRouter>
        <UserContextProvider>
            <Suspense fallback={<Loading />}>
                <Header />
                <div className="container">
                    <Routes location={props.location}>
                        <Route exact path='/posts' element={<Posts />} />
                        <Route exact path='/posts/:postSlug' element={<Post/>} />

                        <Route exact path='/my/bookmarks' element={<RequiredAuth redirectTo="/u/login"><BookmarkedPosts/></RequiredAuth>} />
                        <Route exact path='/my/likes' element={<RequiredAuth redirectTo="/u/login"><LikedPosts/></RequiredAuth>} />
                        <Route exact path='/tags' element={<Tags/>} />
                        <Route exact path='/tags/:slug' element={<Tag/>} />
                        <Route exact path='/about' element={<About/>} />
                        <Route exact path='/contact' element={<Contact/>} />
                        <Route path='/u/dashboard' element={<RequiredAuth redirectTo="/u/login"><Dashboard/></RequiredAuth>} />
                        
                        <Route path='admin/*' element={<AdminRoute/>} />
                        <Route path="u/*" element={<AuthRoute />} />

                        <Route path='/' element={<Home/>} />
                    </Routes>
                </div>

                <div style={footerStyle}
                    onClick={() => {
                        window.scroll({ top: 0, behavior: 'smooth' })
                    }}
                >
                    <i className="fas fa-chevron-up"></i>
                </div>
                <Footer />
            </Suspense>
        </UserContextProvider>
      </BrowserRouter>
    )
}

export default App;