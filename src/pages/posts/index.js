import React, { useEffect, useReducer } from 'react';
import { fetchPosts } from '../../api/ActionCreators';
import { postReducer } from '../../api/Reducers';
import PostCard from '../../components/Posts/PostCard';
import PostViewToggle from '../../components/Posts/PostViewToggle';
import Loading from '../../components/Utility/Loading';

export default function PostList(){
    document.title =  "Posts | CodeUnlock.in"
    const [posts, dispatch] = useReducer(postReducer, {loading: true})
    // const user = useContext(UserContext);

    useEffect(()=>{
        fetchPosts(dispatch);
    }, [])

    return (
        <section className="posts">
            {posts.loading && (<Loading />)}
            {!posts.loading && (
            <>
                <div className="post-info">
                    <div className="post-info-child">
                        <div className="post-header">
                            {/* <i className="fas fa-list-alt" style={{fontSize: "20px", marginRight: "4px"}}></i> */}
                            <h1 className="post_count">All Posts</h1>
                        </div>
                        <PostViewToggle />
                    </div>
                </div> 
                <ul className="post-list">
                {posts?.posts?.length > 0 ? 
                    posts.posts.map((post, index) => (
                        <PostCard key={index} index={index} post={post} />
                    )) 
                :
                    <div style={{fontStyle: "italic"}}>No posts available at the moment!</div>}
                </ul>
            </>
            )} 
        </section>   
    )
}