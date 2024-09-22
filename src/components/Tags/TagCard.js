import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { followTag } from '../../api/ActionCreators';
import { useUserContext } from '../../context/UserContext';
import '../../css/Tags.css';
import Popup from '../Utility/Popup';

export const TagCard = ({tag, index}) => {
    const {user} = useUserContext();
    const [showPopup, setShowPopup] = useState(false);
    const [msg, setMsg] = useState();
    const [type, setType] = useState();
    
    const [status, setStatus] = useState(() => {
        let follows = tag.engagements.find(u => parseInt(u.user_id) === parseInt(user.id))
        return {
            follows: follows ? true : false,
            followers: tag.followers,
            message: ""
        }
    })
    
    const history = useNavigate()
    return (
        <div key={index} className="tag-card">
            {showPopup && <Popup message={msg} type={type} />}
            <div className="card-header">
                <Link to={`/tags/${tag.tag_slug}`}><div className="tag">#{tag.tag}</div></Link>
                <button
                    onClick={() => {
                        if(user.isAuthenticated){
                            followTag(tag.id, user.id).then(res => {
                                status.follows ? setStatus(res) : setStatus(res);
                                // console.log(res);
                                const message = res.follows ? 'Tag Following' : 'Tag Unfollowed';
                                console.log(message);
                                setMsg(message);
                                setType('success');
                                setShowPopup(true);
                                setTimeout(() => setShowPopup(false), 2500);
                            })
                        }
                        else {
                            history.push('/login')
                        }
                    }}
                    className={status.follows ? `form-button active-button follow-tag-${index}` : `form-button unactive-button follow-tag-${index}`}
                >
                    {status.follows ? "FOLLOWING" : "FOLLOW"}
                </button>
            </div>
            <div className="card-body">
                <div className="tag-desc">{tag.description != null ? tag.description : <span className="no-desc">No description available!</span>}</div>
                <div className="post_count">{tag.post_count} Posts | {status.followers || 0} Followers</div> 
            </div>
        </div>
    )
}