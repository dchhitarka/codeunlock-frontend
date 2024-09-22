import React from 'react';
import { useUserContext } from '../context/UserContext';
import '../css/Dashboard.css';
// import {BookmarkedPost, LikedPost} from '../Posts/PostList';

export default function Dashboard(){
    document.title = 'Dashboard | CodeUnlock.in';
    const {user} = useUserContext();
    const dashboardStyle = {
        display: "flex",
    }

    const formStyle = {
        display: "flex",
        flexDirection: "column",
        margin: "8px",
        marginRight: "16px"
    }
    return (
        <>
        <div className="dashboard" style={dashboardStyle}>
            <img src={user.avatar} className="user-avatar" alt="User Avatar"/>
            <form className="profile" style={formStyle}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={user.name ?? ""} onChange={e => console.log(e.target.value)} readOnly/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={user.email ?? ""} onChange={e => console.log(e.target.value)} readOnly/>
            </form>
        </div>
        {/* <BookmarkedPost setTitle={false}/>
        <LikedPost setTitle={false} /> */}
        </>
    )
}