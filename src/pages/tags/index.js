import React, { useEffect, useReducer } from 'react';
import { fetchTags } from '../../api/ActionCreators';
import { tagReducer } from '../../api/Reducers';
import { TagCard } from '../../components/Tags/TagCard';
import Loading from '../../components/Utility/Loading';
import '../../css/Auth.css';
import '../../css/Tags.css';

export default function TagList(){
    const [tags, dispatch] = useReducer(tagReducer, {tags: [], loading: true})
    document.title = 'Tags | CodeUnlock.in';
    useEffect(() => {
        fetchTags(dispatch)
    }, [])

    return (
        <>
            {tags.loading ? <Loading /> : 
            <>
            <div className="sec-header">
                <i className="fas fa-tags" style={{fontSize: "18px", marginRight: "4px"}}></i>
                <span>Tags</span>
            </div>
            <div className="tag-list">
                {tags.tags.length !== 0 && 
                    Object.entries(tags.tags).map(([key, tag], index) => {
                        return <TagCard tag={tag} key={index} index={index} />            
                    })
                }
            </div>
            </>
        }
        </>
    )
}