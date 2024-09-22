import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { engagePost } from "../../api/ActionCreators";
import { postReducer } from "../../api/Reducers";
import { useUserContext } from "../../context/UserContext";
import Popup from "../Utility/Popup";

export default function PostEngage({post}){
    const {user} = useUserContext();
    const [copied, setCopied] = useState(undefined)
    const [liked, setLiked] = useState(undefined)
    const [bookmarked, setBookmarked] = useState(undefined)

    const [activity, dispatch] = useReducer(postReducer, {
        likes: post.post_likes || 0,
        bookmarks: post.post_bookmarks || 0,
    })

    const [status, setStatus] = useState({like: 0, bookmark: 0})
    
    useEffect(() => {
        if(post.post_engagements?.length > 0){
            setStatus({
                like: parseInt(post.post_engagements[0].like),
                bookmark: parseInt(post.post_engagements[0].bookmark)
            })
        }
    }, [post.post_engagements])

    const history = useNavigate();
    return (
        <>
        <div className="popup">
            {liked && <Popup message={liked} type="success"/>}
            {bookmarked && <Popup message={bookmarked} type="success"/>}
            {copied && <Popup message={copied} type="success" />}
        </div>
        <div className="post-engage">
            <div className="action like">
                <div className="post-like"
                    onClick={() => {
                        if(user.isAuthenticated){
                            document.querySelector(".like-icon").style.transform = "scale(0.5, 0.5)"
                            document.querySelector(".like-icon").style.transition = "0.1s"
                            setTimeout(() => {
                                document.querySelector(".like-icon").style.transform = "scale(1, 1)"
                            }, 100)
                            engagePost(dispatch, post.id, user.id, "like").then(res => {
                                status.like ? setStatus(status => ({...status, like: 0})) : setStatus(status => ({...status, like: 1}))  
                                setLiked(res.message);
                                setTimeout(() => setLiked(undefined), 2500);
                            })
                        }
                        else{
                            history("u/login");
                        }
                    }}
                >
                    <i className={status.like === 1 || status.like === true ? "fas fa-thumbs-up like-icon" : "far fa-thumbs-up like-icon"}><abbr title="Copy Link"></abbr></i>                
                </div>
                <div className="stats">{activity.likes}</div>
            </div>
            <div className="action bookmark">
                <div className="post-bookmark"
                    onClick={() => {
                        if(user.isAuthenticated){
                            document.querySelector(".bookmark-icon").style.transform = "scale(0.5, 0.5)"
                            document.querySelector(".bookmark-icon").style.transition = "0.1s"
                            setTimeout(() => {
                                document.querySelector(".bookmark-icon").style.transform = "scale(1, 1)"
                            }, 100)
                            engagePost(dispatch, post.id, user.id, "bookmark").then(res => {
                                status.bookmark ? setStatus(status => ({...status, bookmark: 0})) : setStatus(status => ({...status, bookmark: 1}))  
                                setBookmarked(res.message);
                                setTimeout(() => setBookmarked(undefined), 2500);
                            })
                        }
                        else{
                            history("/u/login");
                        }
                    }}
                >
                    <i className={status.bookmark ? "fas fa-bookmark bookmark-icon" : "far fa-bookmark bookmark-icon"}></i>
                </div>
                <div className="book-stats" style={{paddingTop: "6px"}}>{activity.bookmarks}</div>
            </div>
            <div className="action share">
                <div className="post-share"
                    onClick={(e) => {
                        document.querySelector(".share-icon").style.transform = "scale(0.5, 0.5)"
                        document.querySelector(".share-icon").style.transition = "0.25s"
                        setTimeout(() => {
                            document.querySelector(".share-icon").style.transform = "scale(1, 1)"
                        }, 150)
                        
                        let url = window.location.href;
                        let el = document.createElement("input")
                        el.setAttribute('type', 'text');
                        el.setAttribute('value', url);
                        el.setAttribute('id', "url-copy");
                        document.getElementsByTagName('body')[0].appendChild(el)
                        el.select();
                        el.setSelectionRange(0, 99999); /*For mobile devices*/
                        document.execCommand("copy");
                        document.getElementsByTagName('body')[0].removeChild(el);
                        
                        document.querySelector(".share-icon").classList.remove("far")
                        document.querySelector(".share-icon").classList.add("fas")

                        setTimeout(() => {
                            document?.querySelector(".share-icon")?.classList?.add("far")
                            document?.querySelector(".share-icon")?.classList?.remove("fas")
                        }, 2500)
                        setCopied("Link copied successfully!");
                        setTimeout(() => {setCopied(undefined)}, 2500)  
                    }}
                >
                    <i className="far fa-copy share-icon"></i>
                </div>
            </div>
        </div>
        </>
    )
}
