import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminDashboard } from '../../api/ActionCreators';
import '../../css/Admin.css';

function Admin(){
    document.title = "Dashboard | Admin | CodeUnlock.in";
    const [postCount, setPostCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [tagCount, setTagCount] = useState(0);
    useEffect(() => {
        adminDashboard()
        .then((res) => {
            setPostCount(res.post_count);
            setTagCount(res.tag_count);
            setUserCount(res.user_count);
        })
        .catch((err) => console.log(err));
    }, [])
    return (
        <div>
            <h1 className='admin-title'>Admin Dashboard</h1>
            <div className="admin">
                <Link className="admin-card admin-posts" to = "/admin/posts">
                    <div className='admin-card-tag'>Posts</div>
                    <div className='admin-card-count'>{postCount}</div>
                </Link>
                <Link className="admin-card admin-tags" to = "/admin/tags">
                    <div className='admin-card-tag'>Tags</div>
                    <div className='admin-card-count'>{tagCount}</div>
                </Link>
                <Link className="admin-card admin-users" to = "/admin/users">
                    <div className='admin-card-tag'>Users</div>
                    <div className='admin-card-count'>{userCount}</div>
                </Link>  
            </div>
        </div>
    )                    
}

export default Admin