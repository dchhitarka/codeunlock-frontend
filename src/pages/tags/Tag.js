import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTag, followTag } from "../../api/ActionCreators";
import { tagReducer } from '../../api/Reducers';
import PostCard from '../../components/Posts/PostCard';
import Loading from "../../components/Utility/Loading";
import { useUserContext } from '../../context/UserContext';
import '../../css/Tags.css';

export default function TagView(){
    const {user} = useUserContext();
    const [tag, dispatch] = useReducer(tagReducer, {loading: true, engagements: []}) 
    document.title = "#" + window.location.pathname.split("/tags/")[1] + " | Tags | CodeUnlock.in";
    const history = useNavigate()
    const {slug} = useParams()

    useEffect(() => {
        fetchTag(dispatch, slug)
    }, [slug])

    const [status, setStatus] = useState(() => {
        return {
            follows: false,
            followers: 0,
            message: ""
        }
    })

    useEffect(() => {
        let follows = tag.engagements.find(u => u.user_id === user.id)
        setStatus({
            follows: follows ? true : false,
            followers: tag.followers,
            message: ""
        })
    // eslint-disable-next-line
    }, [tag])

    return (
        <div className="tag-view">
            {tag.loading ? <Loading />
            :<>
                <div className="tag-header">
                    <div className="tag-name">#{tag.tag}</div>
                    <button
                        onClick={() => {
                            if(user.isAuthenticated){
                                followTag(tag.id, user.id).then(res => {
                                    status.follows ? setStatus(res) : setStatus(res)
                                })
                            }
                            else {
                                history('/login')
                            }
                        }}
                        className={status.follows ? `form-button active-button follow-tag` : `form-button unactive-button follow-tag`}
                    >
                        {status.follows ? "FOLLOWING" : "FOLLOW"}
                    </button>
                </div>
                <div className="tag-body">
                    <div className="tag-desc">{tag.description != null ? tag.description : <span className="no-desc">No description available!</span>}</div>
                    <div className="post_count">{tag.post_count} Posts | {status.followers || 0} Followers</div> 
                </div>
                <div className="tag-posts">
                    <div className="tag-posts-head">POSTS</div>
                    {tag.posts.length > 0 && tag.posts.map((post, index) => 
                        <PostCard post={post} key={index} index={index} />
                    )}
                    {tag.posts.length === 0 && <div style={{fontStyle: "italic"}}>No post available!</div>}
                </div>
            </>
            }
        </div>
    )
}