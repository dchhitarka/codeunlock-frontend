import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { deleteTag, fetchTags } from '../../api/ActionCreators';
import { tagReducer } from '../../api/Reducers';
import "../../css/Auth.css";
import { formatDate } from '../../hooks/Hooks';
import Loading from '../Utility/Loading';

export default function Tags(props){
    document.title =  "Tags | Admin | CodeUnlock.in"
    const [tags, dispatchFetch] = useReducer(tagReducer, {
        tags: {
            id: "",
            tag: "",
            user: "",
            create_at: "",
        },
        loading: true
    })

    const [deleteMsg, dispatchDelete] = useReducer(tagReducer, {
        message: ""
    })

    useEffect(()=>{
        fetchTags(dispatchFetch);
    }, [])

    return (
        <main>
            {tags.loading ? <Loading /> :
            <>
                {/* {console.log(tags.tags)} */}
                <Link to="/admin/tag/create"><button className="form-button active-button">NEW TAG</button></Link>
                <Link to="/admin"><button className="form-button unactive-button">BACK</button></Link>
                <div className="message">{deleteMsg.message}</div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table-col-heading">Id</th>
                            <th className="table-col-heading">Edit</th>
                            <th className="table-col-heading">Tag</th>
                            <th className="table-col-heading">Created On</th>
                            <th className="table-col-heading">User</th>
                            <th className="table-col-heading">Followers</th>
                            <th className="table-col-heading">Posts</th>
                            <th className="table-col-heading">Delete</th>
                        </tr>
                    </thead> 
                    <tbody>
                        <TagTable tags={Object.values(tags.tags)} props={props} dispatchDelete={dispatchDelete}/>
                    </tbody>
                </table>
            </>
            }
        </main>
    )
}

const TagTable = ({tags, props, dispatchDelete}) => {

    return tags.map((tag, index) => {
        return (
            <tr className="tag-row" key={index}>
                <td>{tag.id}</td>
                <td>
                    <Link 
                        to={`${tag.tag_slug}`}
                        state={tag}
                    >
                        <i className="fas fa-edit"></i>
                    </Link>
                </td>
                <td>{tag.tag}</td>
                <td>{formatDate(tag.created_at)}</td>
                <td>{tag.user_id}</td>
                <td>{tag.followers}</td>
                <td>{tag.post_count}</td>
                <td onClick={() => deleteTag(dispatchDelete, tag.id)
                                    .then((res) => {
                                        // if(typeof res === Object)       
                                        window.location.reload()
                                    })
                            }
                    style={{cursor: "pointer"}}
                >
                    <i className="fas fa-trash-alt"></i>
                </td>
            </tr>
        );
    })
}