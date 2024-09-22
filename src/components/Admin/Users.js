import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, fetchUsers } from '../../api/ActionCreators';
import { userReducer } from '../../api/Reducers';
import "../../css/Auth.css";
import { formatDate } from '../../hooks/Hooks';
import Loading from '../Utility/Loading';

export default function Users(props){
    document.title =  "Users | Admin | CodeUnlock.in"
    const [loading, setLoading] = useState(true);
    const [users, dispatchUsers] = useReducer(userReducer, [{
        id: "",
        name: "",
        email: "",
        avatar: "",
        created_at: "",
        updated_at: "",
    }])
    
    const [deleteMsg, dispatchDelete] = useReducer(userReducer, {
        message: ""
    })

    useEffect(()=>{
        fetchUsers(dispatchUsers)
        .then(() => setLoading(false));
    }, [])

    // const tagsToString = (tags) => {
    //     let tagArr = []
    //     if(tags){
    //         tags.map(tag => {
    //             tagArr.push(tag.tag)
    //         })
    //     }
    //     return tagArr.join(", ")
    // }

    const tableFormat = () => {
        return users.map((user, index) => {
            return (
                <tr className="user-row" key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    {/* <td>{post.post_likes}</td> */}
                    {/* <td>{post.post_bookmarks}</td> */}
                    <td>{formatDate(user.created_at)}</td>
                    <td>{formatDate(user.updated_at)}</td>
                    {/* <td>{tagsToString(post.tags)}</td> */}
                    {/* <td>
                        <Link to={{
                            pathname: `${props.path}/${post.post_slug}`,
                            state: {...post, tags: tagsToString(post.tags)}
                        }}>
                            Edit
                        </Link>
                    </td> */}
                    <td onClick={() => deleteUser(user.id, dispatchDelete)}>Delete</td>
                </tr>
            );
        })
    };

    if(loading){
        return <Loading />
    }
    return (
        <main>
            <Link to="/admin"><button className="form-button unactive-button">BACK</button></Link>
            <div className="message">{deleteMsg.message}</div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-col-heading">Id</th>
                        <th className="table-col-heading">Name</th>
                        <th className="table-col-heading">Email</th>
                        <th className="table-col-heading">Join On</th>
                        <th className="table-col-heading">Last Login</th>
                        {/* <th className="table-col-heading">Saves</th>
                        <th className="table-col-heading">Tags</th>
                        <th className="table-col-heading">Edit</th> */}
                        <th className="table-col-heading">Delete</th>
                    </tr>
                </thead> 
                <tbody>
                    {tableFormat()}
                </tbody>
            </table>
        </main>
    )
}