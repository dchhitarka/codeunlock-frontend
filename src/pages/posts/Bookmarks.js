import React, { useEffect, useReducer } from "react";
import { fetchPosts } from "../../api/ActionCreators";
import { postReducer } from "../../api/Reducers";
import PostCard from "../../components/Posts/PostCard";
import PostViewToggle from "../../components/Posts/PostViewToggle";
import Loading from "../../components/Utility/Loading";
import { useUserContext } from "../../context/UserContext";

const BookmarkedPosts = (props) => {
    if(props?.setTitle !== false)
        document.title =  "Bookmarked Posts | CodeUnlock.in"
    const [posts, dispatch] = useReducer(postReducer, {loading: true})
    const {user} = useUserContext();

    useEffect(()=>{
        fetchPosts(dispatch, user.id, "bookmarks");
    }, [user.id])

    return (
        <section className="posts">
            {posts.loading && (<Loading />)}
            {!posts.loading && (
                <>
                <div className="post-info">
                    <div className="post-info-child">
                        <div className="post-header">
                            <i className="fas fa-bookmark" style={{fontSize: "20px", marginRight: "4px"}}></i>
                            <h1 className="post_count">Bookmarks</h1>
                        </div>
                        <PostViewToggle />
                    </div>
                </div>
                <ul className="post-list">
                {posts.posts.length > 0 && posts.posts.map((post, index) => <PostCard key={index} index={index} post={post} />)}
                {posts.posts.length === 0 && <div style={{fontStyle: "italic"}}>You haven't bookmarked any post at the moment!</div>}
                </ul>
                </>
            )} 

        </section>            
    )
}

export default BookmarkedPosts;