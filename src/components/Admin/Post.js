import React, { useEffect, useReducer, useState } from 'react';
// import ReactMarkdown from 'react-markdown/with-html'
import { Link, useLocation, useParams } from 'react-router-dom';
import { deleteComment, fetchComments, fetchPost, updatePost } from '../../api/ActionCreators';
import { commentReducer, postReducer } from '../../api/Reducers';
import "../../css/Admin.css";
import { formatDate } from '../../hooks/Hooks';
import noimage from '../../images/noimage.png';
import PostBody from '../Posts/PostBody';
import Loading from '../Utility/Loading';
import Popup from '../Utility/Popup';

export default function Post(props){
    let { state } = useLocation();
    const [post, dispatch] = useReducer(postReducer, state ?? {loading: true, id: null})
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState({
        post_title: "",
        post_body: "",
        post_image: "",
        post_status: 0
    })
    const [tags, setTags] = useState([])
    const [preview, setPreview] = useState(false)
    const postSlug = useParams().post
    
    useEffect(()=>{
        // if(state) {
        //     setLoading(false);
        //     setPostData({...postData, post_body: post.post_body, post_title: post.post_title, post_status: parseInt(post.post_status), post_image: post.post_image ?? ""});
        //     return;
        // }
        fetchPost(postSlug, dispatch)
        .then(res => {
            let ts = []
            res.tags.map(tag => ts.push(tag.tag))
            // console.log(postData)
            setTags(ts)
            setPostData({...postData, post_body: post.post_body, post_title: post.post_title, post_status: parseInt(post.post_status), post_image: post.post_image ?? ""}) //require('../../images/noimage.png')
            setLoading(false);
        })
        document.title = (post?.post_title ?? window.location.pathname.split("/admin/posts/")[1].split('-').map(str => str[0].toUpperCase() + str.slice(1)).join(" ")) +" | Admin | Codeunlock.in"
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setLoading(post.loading);
    }, [post])
    
    return (
        <div className="post-edit">
            <div className="popup">
                {post?.error && <Popup msg={post?.error} type="error" />}
                {post?.message && <Popup message={post?.message} type="success" />}
            </div>
            {preview && <Preview post={postData} toggle={setPreview}/>}
            {loading ? <Loading />
            :<form className="post-form"
                onSubmit={async (e) => {
                    e.preventDefault()
                    setLoading(true);
                    const tags = []
                    document.querySelectorAll(".post_tags").forEach(tag => tags.push(tag.value))
                    // console.log(post.id, {...postData, tags: tags})
                    await updatePost(post.id, {...postData, tags: tags}, dispatch)
                }
            }
            >
                <div className="form-header" style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <button className="form-button">UPDATE</button>
                    <div className="form-heading">POST</div>
                    <Link to="/admin/posts"><button className="form-button unactive-button">BACK</button></Link>
                </div>
                <div className="admin-post-top">
                    <div className="admin-post-top-left">
                        <div className="form-input">
                            <label className="form-label">Title</label>
                            <input type="text" value={postData.post_title} name="post_title" id="title" onChange={e => setPostData({...postData, post_title: e.target.value})} required/>
                        </div>
                        
                        <div className="form-input">
                            <label className="form-label">Status</label>
                            <select name="post_status" id="post_status" onChange={e => setPostData({...postData, post_status: parseInt(e.target.value)})} required>
                                <option value="0" defaultValue={parseInt(postData.post_status) === 0 ? true: false} selected={parseInt(postData.post_status) === 0 ? true: false}>Draft</option>
                                <option value="1" defaultValue={parseInt(postData.post_status) === 1 ? true: false} selected={parseInt(postData.post_status) === 1 ? true: false}>Published</option>
                            </select>
                        </div>
                        <div className="form-input">
                            <label className="form-label">Image (Add Drive link where the image is stored)</label>
                            <input type="text" value={postData?.post_image ?? "https://drive.google.com/uc?export=view&id="} onChange={e => setPostData({...postData, post_image: e.target.value})} />
                        </div>

                    </div>
                    <div className='admin-post-top-right'>
                        <img src={postData.post_image} onError={e => e.target.src = noimage} id="post_image"  width="200" height="200" alt="Post Cover"/>
                    </div>
                </div>
                
                <div className="form-input">
                    <label className="form-label" style={{display: "flex", justifyContent: "space-between"}}>
                        <span>Body</span>
                        <div style={{display: "flex"}}>
                            {/* <Link to={{pathname: `/admin/post/preview`, state: {...postData, created_at: new Date(Date.now()).toISOString()}}}>Preview</Link><br /> */}
                            <div onClick={() => setPreview(true)}>Preview</div>
                            <div className="words-count" style={{marginLeft: "10px", color: "grey", fontStyle: "italic", fontSize: "15px"}}>
                                {`${post?.post_body?.split(" ").length ?? 0} words`}
                            </div>
                        </div>
                    </label>
                    <textarea type="text" rows="40" value={postData.post_body} name="post_body" id="post_body" onChange={e => setPostData({...postData, post_body: e.target.value})} required/>
                </div>
                
                <div className="form-input">
                    <label className="form-label">Tags</label>
                    
                    <div className="tags-list">
                        {tags.map((tag, i) => <input type="text" key={i} value={tag} name={`tags${i}`} id={`tags${i}`} onChange={() => {}} className="post_tags" required/>)}
                    </div>

                    <div className="action-buttons">
                        <button className="form-button" 
                            onClick={(e) => {
                                e.preventDefault()
                                let newTagInput = document.createElement("INPUT")
                                newTagInput.className =  "post_tags"
                                document.querySelector('.tags-list').appendChild(newTagInput)
                            }
                        }>ADD</button>
                        <button className="form-button unactive-button" 
                            onClick={(e) => {
                                e.preventDefault()
                                let tagsList = document.querySelector(".tags-list")
                                // if(tagsList.childElementCount > 1)
                                tagsList.removeChild(tagsList.lastElementChild)
                                // else
                                //     alert("One tag is required")
                            }
                        }>REMOVE</button>
                    </div>

                </div>

                <div className="all-comments form-input">
                    <div className="heading" style={{marginBottom: "10px"}}>Comments</div>
                    <Comments postId={post.id}/>
                </div>

                {/* <div>
                    <button className="form-button">UPDATE</button>
                    <Link to="/admin/posts"><button className="form-button unactive-button">BACK</button></Link>    
                </div> */}
            </form>
        }
        </div>
    )
}

const Comments = ({postId}) => {
    const [comments, dispatchComment] = useReducer(commentReducer, [])

    useEffect(()=>{
        fetchComments(postId, dispatchComment);
    }, [postId])

    return comments.length === 0 ?  
        <div>No comments available</div>
        :  
        <table className="table" style={{overflowX: "auto"}}>
            <thead>
                <tr>
                    <th className="table-col-heading">Id</th>
                    <th className="table-col-heading">User</th>
                    <th className="table-col-heading">Comment</th>
                    <th className="table-col-heading">Likes</th>
                    <th className="table-col-heading">Date</th>
                    <th className="table-col-heading">Delete</th>
                </tr>
            </thead> 
            <tbody>
            {comments.map((comment, index) => {
                return (
                    <tr className="post-row" key={index} style={{overflowX: "scroll"}}>
                        <td>{comment.id}</td>
                        <td>{comment.user.name}</td>
                        <td>{comment.comment_body}</td>
                        <td>{comment.comment_likes}</td>
                        <td>{formatDate(comment.created_at)}</td>
                        <td onClick={() => deleteComment(postId, comment.id, dispatchComment)}>Delete</td>
                    </tr>
                )}
            )}
            </tbody>
        </table>
}

export const Preview = ({post, toggle}) => {
    // const history = useNavigate();
    const style = {
        position: 'fixed',
        top: "50px",
        bottom: "50px",
        left: "5%",
        margin: "25px 0",
        display: "flex", 
        flexDirection: 'column',
        zIndex: "100",
        backgroundColor: "white",
        border: "1px solid black",
        overflowY: "scroll",
        width: "90vw"
    }
    return (
        <div style={style}>
            <button style={{position: 'absolute', right: "0", top: "5px"}} className="form-button unactive-button" onClick={() => toggle(false)}>CLOSE</button>
            <div style={{marginTop: "250px"}}>
                <PostBody post={post} />
            </div>
        </div>
    )
}
