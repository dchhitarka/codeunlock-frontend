import React, { useReducer, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { updateTag } from '../../api/ActionCreators';
import { tagReducer } from '../../api/Reducers';
import "../../css/Auth.css";
import '../../css/fontawesome/css/all.css';
import { formatDate } from '../../hooks/Hooks';

export default function Tag(props){
    // eslint-disable-next-line
    const { state } = useLocation();
    const [tagRed, dispatch] = useReducer(tagReducer, {})
    const [tag, setTag] = useState(state)
    
    if(tag === undefined) window.location.replace("/admin/tags")
    document.title = (tag?.tag ?? window.location.pathname.split("/admin/tags/")[1]) +" | Tags | Admin | CodeUnlock.in"

    return (
        <div className="tag-edit">
            <form onSubmit={(e) => {
                e.preventDefault()
                // console.log(tag)
                updateTag(tag.id, {tag: tag.tag, description: tag.description}, dispatch)
                .then(res => window.location.replace("/admin/tags"))
            }}>
                <div className="form-header">
                    <div className="form-heading">TAG</div>
                </div>
                <div className="form-input">
                    <label className="form-label">Tag</label>
                    <input type="text" value={tag.tag} name="tag" id="tag" onChange={e => setTag({...tag, tag: e.target.value})} required/>
                </div>

                <div className="form-input">
                    <label className="form-label">Description</label>
                    <textarea type="text" rows="10" value={tag.description} name="description" id="description" onChange={e => setTag({...tag, description: e.target.value})} />
                </div>

                <div className="all-posts">
                    <label className="form-label">Posts</label>
                    <TagPosts posts={tag.posts} />
                </div>

                <div>
                    <button className="form-button">UPDATE</button>
                    <Link to="/admin/tags"><button className="form-button unactive-button">BACK</button></Link>    
                </div>
            </form>
        </div>
    )
}

const TagPosts = ({posts}) => {
    const tagsToString = (tags) => {
        let tagArr = []
        if(tags){
            tags.map(tag => tagArr.push(tag.tag))
        }
        return tagArr.join(", ")
    }

    return posts?.length === 0 || posts === undefined ?  
        <div>No posts available</div>
        :  
        <table className="table" style={{overflowX: "auto"}}>
            <thead>
                <tr>
                    <th className="table-col-heading">Id</th>
                    <th className="table-col-heading">Title</th>
                    <th className="table-col-heading">Status</th>
                    <th className="table-col-heading">Likes</th>
                    <th className="table-col-heading">Saves</th>
                    <th className="table-col-heading">Date</th>
                    <th className="table-col-heading">Edit</th>
                </tr>
            </thead> 
            <tbody>
            {posts?.map((post, index) => {
                return (
                    <tr className="post-row" key={index}>
                        <td>{post.id}</td>
                        <td>{post.post_title}</td>
                        <td>{post.post_status ? "Published" : "Draft"}</td>
                        <td>{post.post_likes}</td>
                        <td>{post.post_bookmarks}</td>
                        <td>{formatDate(post.created_at)}</td>
                        <td>
                            <Link to={{
                                pathname: `/admin/posts/${post.post_slug}`,
                                state: {...post, tags: tagsToString(post.tags)}
                            }}>
                                <i className="fas fa-edit"></i>
                            </Link>
                        </td>
                    </tr>
                )}
            )}
            </tbody>
        </table>
}