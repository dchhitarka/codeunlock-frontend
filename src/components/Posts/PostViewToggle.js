import React, { useEffect, useReducer, useState } from 'react';
import { fetchPosts } from '../../api/ActionCreators';
import { postReducer } from '../../api/Reducers';
import '../../css/Posts.css';
import gridActive from '../../images/grid-active.png';
import grid from '../../images/grid.png';
import listActive from '../../images/list-active.png';
import list from '../../images/list.png';
import Loading from '../Utility/Loading';
import PostCard from './PostCard';



export const LatestPost = () => {
    const [posts, dispatch] = useReducer(postReducer, {loading: true})

    useEffect(()=>{
        fetchPosts(dispatch);
    }, [])

    if(posts.loading)
        return <Loading />;
    return (
        <section className="posts grid">
            <ul className="post-list">
            {posts?.posts?.length > 0 ? 
                posts.posts.slice(0,3).map((post, index) => <PostCard key={index} index={index} post={post} />)
            :
                <div style={{fontStyle: "italic"}}>No posts available at the moment!</div>
            }
            </ul>
        </section>            
    )
}

const PostViewToggle = () => {
    const [gridIcon, setGridIcon] = useState(grid);
    const [listIcon, setListIcon] = useState(listActive);
    
    const toggleView = (view) => {
        switch(view){
            case 'grid':
                document.querySelector('.posts').classList.add('grid');
                setGridIcon(gridActive);
                setListIcon(list);
                break;
            case 'list':
                document.querySelector('.posts').classList.remove('grid');
                setGridIcon(grid);
                setListIcon(listActive);
                break;
            default:
                break;
        }
    }
    return (
        <div className="post-filter">
            <abbr title="Grid View"><img src={gridIcon} alt="Grid" className='filter-icon' width="25" height="25" onClick={() => toggleView("grid")}/></abbr>
            <abbr title="List View"><img src={listIcon} alt="List" className='filter-icon' width="25" height="25" onClick={() => toggleView("list")}/></abbr>
        </div>
    )
}

export default PostViewToggle;