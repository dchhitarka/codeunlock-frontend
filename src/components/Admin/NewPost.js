import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPost } from '../../api/ActionCreators';
import "../../css/Auth.css";
import noimage from '../../images/noimage.png';
import Popup from '../Utility/Popup';

export default function NewPost(){
    const [post, setPost] = useState({
        post_title: "",
        post_body: "",
        post_image: undefined,
        post_status: 0
    })
    const [msg, setMsg] = useState(undefined);
    const [err, setErr] = useState(undefined);
    // const [p, dispatch] = useReducer(postReducer, {})

    document.title = "Create New Post | Admin | CodeUnlock.in";

    return (
        <div className="post-edit">
            {msg && <Popup message={msg} type='success' />}
            {err && <Popup message={err} type='error' />}
            <form className="post-form" 
                onSubmit={e => {
                    e.preventDefault();
                    const tags = []
                    document.querySelectorAll(".post_tags").forEach(tag => tags.push(tag.value))
                    createPost({...post, tags: tags})
                    .then(res => {
                        setErr(res?.error ?? undefined)
                        setMsg(res?.message ?? undefined)
                        // window.location.replace("/admin/posts")
                    })
                    // .catch(e)
                }
            }>
                <div className="form-header" style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <button className="form-button">CREATE</button>
                    <div className="form-heading">NEW POST</div>
                    <Link to="/admin/posts"><button className="form-button unactive-button">BACK</button></Link>
                </div>
                <div className="admin-post-top">
                    <div className="admin-post-top-left">
                        <div className="form-input">
                            <label className="form-label">Title</label>
                            <input type="text" value={post.post_title} name="post_title" id="title" onChange={e => setPost({...post, post_title: e.target.value})} placeholder="Add New Title" required/>
                        </div>

                        <div className="form-input">
                            <label className="form-label">Status</label>
                            <select name="post_status" id="post_status" onChange={e => setPost({...post, post_status: parseInt(e.target.value)})} required>
                                <option value="0" defaultValue={post.post_status ? true: false}>Draft</option>
                                <option value="1" defaultValue={post.post_status ? true: false}>Published</option>
                            </select>
                        </div>

                        <div className="form-input">
                            <label className="form-label">Image (Add Drive link where the image is stored)</label>
                            <input type="text" value={post.post_image ?? "https://drive.google.com/uc?export=view&id="} onChange={e => setPost({...post, post_image: e.target.value})} />
                        </div>
                    </div>
                    <div className='admin-post-top-right'>
                        <img src={post.post_image} onError={e => e.target.src = noimage} id="post_image"  width="200" height="200" alt="Post Cover"/>
                    </div>
                </div>
    
                <div className="form-input">
                    <label className="form-label" style={{display: "flex", justifyContent: "space-between"}}>
                        <span>Body</span>
                        <div className="words-count" style={{color: "grey", fontStyle: "italic", fontSize: "15px"}}>
                            {post.post_body.length === 0 ? '0 words' : `${post.post_body.split(" ").length} words`}
                        </div>
                    </label>
                    {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
                    <textarea type="text" rows="50" value={post.post_body} name="post_body" id="post_body" onChange={e => setPost({...post, post_body: e.target.value})} required/>
                </div>

                <div className="form-input">
                    <label className="form-label">Tags</label>
                    
                    <div className="tags-list">
                        <input type="text" name="tags" className="post_tags" required/>
                    </div>

                    <div className="action-buttons">
                        <button className="form-button" 
                            onClick={(e) => {
                                e.preventDefault()
                                let newTagInput = document.createElement("INPUT")
                                newTagInput.className =  "post_tags"
                                newTagInput.required = true;
                                document.querySelector('.tags-list').appendChild(newTagInput)
                            }
                        }>ADD</button>
                        <button className="form-button unactive-button" 
                            onClick={(e) => {
                                e.preventDefault()
                                let tagsList = document.querySelector(".tags-list")
                                if(tagsList.childElementCount > 1)
                                    tagsList.removeChild(tagsList.lastElementChild)
                                else
                                    alert("One tag is required")
                            }
                        }>REMOVE</button>
                    </div>
                </div>

                {/* <div>
                    <button className="form-button">CREATE</button>
                    <Link to="/admin/posts"><button className="form-button unactive-button">BACK</button></Link>    
                </div> */}
            </form>
        </div>
    )
}