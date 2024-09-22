import React, { useEffect, useReducer, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import { engagePost } from '../../api/ActionCreators';
import { postReducer } from '../../api/Reducers';
import { useUserContext } from '../../context/UserContext';
import '../../css/Posts.css';
import '../../css/fontawesome/css/all.css';
import { formatDate } from '../../hooks/Hooks';
import noimage from '../../images/noimage.png';
import Popup from '../Utility/Popup';

function PostCard({ post, index }) {
    const { user } = useUserContext();

    // eslint-disable-next-line
    const [activity, dispatch] = useReducer(postReducer, {})
    const [bookmarked, setBookmarked] = useState(undefined)

    const [body, setBody] = useState(() => {
        return window.innerWidth <= 767 ? 125 : 175
    })

    const [engage, setEngage] = useState({
        like: false,
        bookmark: false
    })

    useEffect(() => {
        if (user.isAuthenticated) {
            let eng = post.post_engagements.find(post_eng => parseInt(post_eng.user_id) === parseInt(user.id))
            if (eng)
                setEngage({ ...engage, like: parseInt(eng.like), bookmark: parseInt(eng.bookmark) })
        }
        // eslint-disable-next-line
    }, [post.post_engagements])

    let history = useNavigate();

    const linkProp = {
        pathname: `/posts/${post.post_slug}`,
        state: { ...post }
    }

    const bigTitleDiff = (title) => title.length > 60 ? 60 : 0
    useEffect(() => {
        const resizeBody = () => {
            if (window.innerWidth <= 600)
                setBody(100)
            else //if (window.innerWidth > 768)
                setBody(200)
        }
        window.addEventListener('resize', resizeBody)
        return () => window.removeEventListener('resize', resizeBody);
    }, [])

    const colors = ["red", "indigo", "blue", "green", "yellow", "orange", "violet"];
    return (
        <>
            {bookmarked && <Popup message={bookmarked ?? 'Testing'} type="success" />}
            <div key={index} className="post-card">
                <Link to={linkProp}>
                    <img className="post-img" loading="lazy" onError={e => e.target.src = noimage} src={post.post_image ?? noimage} alt="" />
                </Link>
                <div className="post-data">
                    <Link to={linkProp} className="post-title-link">
                        <div className="post-title">{post.post_title}</div>
                    </Link>
                    <Link to={linkProp} className="post-content-link">
                        <ReactMarkdown className="post-content" children={`${post.post_body.substring(0, body - bigTitleDiff(post.post_title))}...`} skipHtml={true} />
                    </Link>
                    <div className="post-tags">
                        {post.tags.slice(0, 2).map((tag, index) => (
                            <Link to={`/tags/${tag.tag_slug}`} key={index}>
                                <span className="post-tag"
                                    onMouseOver={e => e.target.style.opacity = "0.8"}
                                    onMouseLeave={e => e.target.style.opacity = "1"}
                                    style={{ backgroundColor: colors[index] }} key={index}>{`#${tag.tag}`}
                                </span>
                            </Link>
                        ))}
                        {post.tags.length - 2 > 0 ? <span style={{ padding: "2px", fontWeight: "bold" }}>+{post.tags.length - 2}</span> : ''}
                    </div>
                    <div className="post-meta">
                        <div className="post-date">Published On: {formatDate(post.published_on)}</div>
                        <div className="engage-post">
                            <div className="posts post-bookmark"
                                onClick={() => {
                                    if (user.isAuthenticated) {
                                        document.querySelector(`.bookmark-icon-${index}`).style.transform = "scale(0.5, 0.5)"
                                        document.querySelector(`.bookmark-icon-${index}`).style.transition = "0.1s"
                                        setTimeout(() => {
                                            document.querySelector(`.bookmark-icon-${index}`).style.transform = "scale(1, 1)"
                                        }, 100)

                                        engagePost(dispatch, post.id, user.id, "bookmark").then(res => {
                                            engage.bookmark ? setEngage(eng => ({ ...eng, bookmark: 0 })) : setEngage(eng => ({ ...eng, bookmark: 1 }))
                                            setBookmarked(res.message);
                                            setTimeout(() => setBookmarked(undefined), 2500);
                                        })
                                    }
                                    else {
                                        history.push("/u/login");
                                    }
                                }}
                            >
                                <i className={engage.bookmark === 1 || engage.bookmark === true ? `fas fa-bookmark bookmark-icon-${index}` : `far fa-bookmark bookmark-icon-${index}`} style={{ color: 'black' }}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostCard;