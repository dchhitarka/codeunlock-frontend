import React, { useEffect, useReducer, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { addComment, fetchComments } from "../../api/ActionCreators";
import { commentReducer } from "../../api/Reducers";
import { useUserContext } from "../../context/UserContext";
import { formatDate } from "../../hooks/Hooks";

export default function PostComment({post}){
    const { user } = useUserContext();
    const [comments, dispatch] = useReducer(commentReducer, [])
    const [comment, setComment] = useState("")
    const history = useNavigate()

    useEffect(()=>{
        fetchComments(post.id, dispatch);
    // eslint-disable-next-line
    }, [])

    return (
        <section className="comments">
            <h1>Discussion</h1>
            <span>You can use markdown in the comment box! :)</span>
            <form className="new-comment" 
                  onSubmit={e => {
                        if(user.isAuthenticated){
                            e.preventDefault()
                            addComment({comment, postId: post.id}, dispatch)
                            setComment("")
                        }
                        else{
                            history("u/login")
                        }
                      }
                  } 
            >
                <textarea className="comment-input" value={comment} rows="5" placeholder="Share your thoughts!" 
                    onChange={e => setComment(e.target.value)} required />
                <div className="comment-bottom">
                    <input type="submit" value="SHARE" className="comment-submit"/>
                </div>
            </form>

            <div className="all-comments">
                {comments.length > 0 && <h2 style={{padding: "4px"}}>{comments.length} Comments<hr /></h2>}
                {comments.length > 0 && comments.map((comment, index) => (
                    <div className="comment-box" key={index}>
                        <div className="comment-author">
                                <img src={comment.user.avatar} width="30" height="30" alt="User" className="avatar"/>
                                <div className="author">{comment.user.name}</div>
                                <div className="comment-date">{formatDate(comment.created_at)}</div>
                        </div>
                        <div style={{'margin':2, "padding": 5}}>
                        <ReactMarkdown 
                            children={comment.comment_body}
                            components={{
                                code({node, inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={a11yDark}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                    {children}
                                    </code>
                                )
                                }
                            }} 
                        />
                        </div>
                    </div>
                    )
                )}
            </div>
        </section>
    )
}
