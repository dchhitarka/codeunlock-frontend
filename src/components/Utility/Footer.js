import React from 'react';
import '../../css/Footer.css';

function Footer(){
    
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="important-links footer-cols">
                    <h4>QUICK LINKS</h4>
                    <a href="https://dchhitarka.github.io/" className="footer-links">About</a>
                    <a href="mailto:connect@codeunlock.in" className="footer-links">Contact Me</a>
                    <a href="https://www.termsandconditionsgenerator.com/live.php?token=wvWK6xVNeRGwwnlnNeymBSSOKRmcrvAM" target="_blank" rel="noopener noreferrer" className="footer-links">Terms and Conditions</a>
                </div>
                <div className="other-projects footer-cols">
                    <h4>Projects</h4>
                    <a href="http://dchhitarka.github.io/" className="footer-links">Portfolio</a>
                    <a href="http://dchhitarka.pythonanywhere.com/" className="footer-links">Django</a>
                    {/* <a href="http://www.webprojects.cf/?i=1" className="footer-links">PHP</a> */}
                    <a href="/" className="footer-links">JavaScript</a>
                    {/* <a href="http://www.webprojects.cf/wpblog/?i=1" className="footer-links">WordPress Theme</a> */}
                </div>
                <div className="social-media footer-cols">
                    <h4>Social Media</h4>
                    <div className="social_link">
                        <a href="https://www.facebook.com/deepak.chhitarka/" className="footer-links"><i className="fab fa-facebook"></i></a>
                        <a href="https://github.com/dchhitarka" className="footer-links"><i className="fab fa-github"></i></a>
                        <a href="https://www.reddit.com/user/dchhitarka/" className="footer-links"><i className="fab fa-reddit"></i></a>
                        <a href="https://www.linkedin.com/in/deepak-chhitarka-a7658714b/" className="footer-links"><i className="fab fa-linkedin"></i></a>
                        <a href="https://twitter.com/DeepakChhitarka" className="footer-links"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.instagram.com/codeunlock.in/" className="footer-links"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer_bottom">
                <p>&copy; 2020 - ALL RIGHTS RESERVED</p>
                <p>Designed And Developed By <span style={{color: "red"}}>Deepak Chhitarka</span></p>
            </div>
        </footer>
    )
}

export default Footer