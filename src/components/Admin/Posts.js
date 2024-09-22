import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { deletePost, fetchPosts } from '../../api/ActionCreators';
import { postReducer } from '../../api/Reducers';
import "../../css/Auth.css";
import '../../css/fontawesome/css/all.css';
import { formatDate } from '../../hooks/Hooks';
import Loading from '../Utility/Loading';

export default function Posts(props){
    document.title =  "Posts | Admin | CodeUnlock.in"
    const [posts, dispatchFetch] = useReducer(postReducer, {
        posts: [{
            id: "",
            post_title: "",
            create_at: "",
            post_likes: "",
            post_bookmarks: "",
        }],
        loading: true
    })
    
    useEffect(()=>{
        fetchPosts(dispatchFetch, null, 'admin');
    }, [])

    const [deleteMsg, dispatchDelete] = useReducer(postReducer, {
        message: ""
    })

    return (
        <main>
            {posts.loading ? <Loading /> :
            <>
                <Link to="/admin/post/create"><button className="form-button active-button">NEW POST</button></Link>
                <Link to="/admin"><button className="form-button unactive-button">BACK</button></Link>
                <div className="message">{deleteMsg.message}</div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table-col-heading">Id</th>
                            <th className="table-col-heading">Edit</th>
                            <th className="table-col-heading">Title</th>
                            <th className="table-col-heading">Status</th>
                            <th className="table-col-heading">Created On</th>
                            <th className="table-col-heading">Published On</th>
                            <th className="table-col-heading">Likes</th>
                            <th className="table-col-heading">Saves</th>
                            <th className="table-col-heading">Comments</th>
                            <th className="table-col-heading">Tags</th>
                            <th className="table-col-heading">Delete</th>
                        </tr>
                    </thead> 
                    <tbody>
                        <PostTable posts={posts.posts} props={props} dispatchDelete={dispatchDelete}/>
                    </tbody>
                </table>
            </>
            }
        </main>
    )
}

const PostTable = ({posts, props, dispatchDelete}) => {
    const tagsToString = (tags) => {
        let tagArr = []
        if(tags){
            tags.forEach(tag => {
                tagArr.push(tag.tag)
            })
        }
        return tagArr.join(", ")
    }

    return posts?.map((post, index) => {
        return (
            <tr className="post-row" key={index}>
                <td>{post.id}</td>
                <td>
                    <Link 
                        to={`${post.post_slug}`}
                        state={post}
                    >
                        <i className="fas fa-edit"></i>
                    </Link>
                </td>
                <td>{post.post_title}</td>
                <td>{parseInt(post.post_status) === 0 ? "Draft" : "Published"}</td>
                <td>{formatDate(post.created_at)}</td>
                <td>{post.published_on ? formatDate(post.published_on) : 'Not Published'}</td>
                <td>{post.post_likes}</td>
                <td>{post.post_bookmarks}</td>
                <td>{post.comments_count}</td>
                <td>{tagsToString(post.tags)}</td>
                <td style={{cursor: "pointer"}}
                    onClick={() => {
                        deletePost(post.id, dispatchDelete).then((res) => window.location.reload())
                        }
                }>
                    <i className="fas fa-trash-alt"></i>
                </td>
            </tr>
        );
    })
}