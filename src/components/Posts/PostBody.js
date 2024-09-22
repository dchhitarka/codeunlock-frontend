import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { formatDate } from "../../hooks/Hooks";
import noimage from '../../images/noimage.png';

export default function PostBody({post}){
    const colors = ["red", "indigo", "blue", "green", "yellow", "orange", "violet"];
    return (
        <section className="post">
            <h1 className="title">{post.post_title}</h1>
            <div className="metadata">
                <div className="post-date" style={{display: "flex", alignItems: "center"}}>
                    <span>Published On: {formatDate(post?.published_on ?? post?.created_at)}</span>
                </div>    
                <div className="post-tags">
                    {post.tags && post.tags.map((tag, index) => (
                        <Link to={`/tags/${tag.tag_slug}`} key={index}>
                            <span className="post-tag" 
                                onMouseOver={e => e.target.style.opacity = "0.8"} 
                                onMouseLeave={e => e.target.style.opacity = "1"} 
                                style={{backgroundColor: colors[index]}} key={index}>{`#${tag.tag}`}
                            </span>
                        </Link>
                    ))}
                </div>

            </div>
            <img className="image" onError={e => {e.target.src = noimage;e.target.style.display = "none"}} src={post.post_image ?? ""} alt="Post" />
            <div className="content">
                <ReactMarkdown 
                    children={post.post_body}
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
            <hr />
        </section>
    )
}
