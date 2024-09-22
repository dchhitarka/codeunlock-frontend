import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../../api/ActionCreators';
import { postReducer } from '../../api/Reducers';
import PostBody from '../../components/Posts/PostBody';
import PostComment from '../../components/Posts/PostComments';
import PostEngage from '../../components/Posts/PostEngage';
import Loading from '../../components/Utility/Loading';
import { useUserContext } from '../../context/UserContext';
import '../../css/Posts.css';
import '../../css/fontawesome/css/all.css';

function Post(){
    const { user } = useUserContext(); 
    let { postSlug } = useParams(); 
    const [post, dispatch] = useReducer(postReducer, {loading: true})
    document.title = `${post?.post_title ?? window.location.pathname.split("/posts/")[1].split('-').map(str => str[0].toUpperCase() + str.slice(1)).join(" ")} | CodeUnlock.in`;
    
    useEffect(() => {
        fetchPost(postSlug, dispatch, user.isAuthenticated)
    // eslint-disable-next-line
    }, [user.isAuthenticated])

    return (
        <>
            {post.loading && <Loading />}
            {!post.loading && (
                <>
                <PostEngage post={post}/>
                <PostBody post={post}/>
                <PostComment post={post}/>
                </>
            )}
        </>
    )
}

export default Post;