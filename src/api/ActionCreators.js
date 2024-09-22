import * as ActionTypes from './ActionTypes';
import { config } from './config';

/****** */
// AUTHENTICATION ACTIONS//
/******* */

export const userLogin = async (credentials, dispatch) => {
    let currentUrl = `auth/login`
    dispatch({type: ActionTypes.LOADING})
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: ActionTypes.FETCH_USER, payload: data})
    }
    catch(e){
        console.log(e);
        
        dispatch({type: ActionTypes.FAILED, payload: e})
    }
}

export const userRegister = async (credentials, dispatch) => {
    let currentUrl = `auth/register`
    dispatch({type: ActionTypes.LOADING})
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: "STOP_LOADING"})
        return data
    }
    catch(e){
        window.location.replace('/register');
        // dispatch({type: "STOP_LOADING"})
        return e
    }
}

export const userLogout = async () => {
    let currentUrl = `auth/logout`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            headers: config.headers,
        })
        await res.json()
        return {logout: true}
    }
    catch(e){
        // console.log(e)
    }
}

// Verify Email
export const verify = async (hash, email_hash) => {
    let currentUrl = `auth/verify/${hash}/${email_hash}`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            headers: config.headers,
        })
        let data = await res.json()
        return {...data, status: true}
    }
    catch(e){
        // console.log(e)
        return {error: e.error, status: false}
    }
}

export const sendMailForVerification = async (email) => {
    let currentUrl = `auth/verify/mail`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: 'POST',
            body: JSON.stringify({'email': email}),
            headers: config.headers,
        })
        let data = await res.json()
        return {...data, status: true}
    }
    catch(e){
        // console.log(e)
        return {error: e.error, status: false}
    }
}

// PASSWORD RESET
export const forgot = async (email) => {
    try{
        let currentUrl = 'auth/forgot';
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: 'POST',
            body: JSON.stringify({'email': email}),
            headers: config.headers,
        })
        let data = await res.json()
        return data;
    }
    catch(e){
        // console.log(e)
        if (e.message === 'NetworkError when attempting to fetch resource.')
            return {error: 'Unable to send mail at the moment! Please try again!'}
        return {error: e.message}
    }
}

export const reset = async (hash) => {
    try{
        let currentUrl = `auth/reset/${hash}`;
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            headers: config.headers,
        })
        let data = await res.json();
        if(res.status === 410){
            return {...data, status: 410}
        }
        return data;
    }
    catch(e){
        // console.log(e)
        return {error: e.error}
    }
}

export const update = async (hash, password) => {
    try{
        let currentUrl = `auth/update/${hash}`;
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: 'POST',
            body: JSON.stringify({'password': password}),
            headers: config.headers,
        })
        let data = await res.json();
        return data;
    }
    catch(e){
        if(e.status === 410){
            return {error: e.error}
        }
        // console.log(e)
    }
}


/****** */
// USERS ACTIONS//
/******* */
export const fetchUsers = async (dispatch) => {
    let currentUrl = `auth/users`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: ActionTypes.FETCH_USERS, payload: data})
    }
    catch(e){
        dispatch({type: ActionTypes.FAILED, payload: e})
    }
}

export const fetchUser = async (user_id) => {
    let currentUrl = `auth/user/${user_id}`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            headers: config.headers,
        })
        let data = await res.json()
        return data;
    }
    catch (e){
        console.error(e)
        // dispatch({type: ActionTypes.FAILED, payload: e})
    }
}

export const deleteUser = async (user_id, dispatch) => {
    let currentUrl = `auth/user/${user_id}`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: "DELETE",
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: ActionTypes.DELETE_USER, payload: data})
    }
    catch(e){
        dispatch({type: ActionTypes.FAILED, payload: e})
    }
}

/****** */
// POSTS ACTIONS//
/******* */

export const fetchPosts = async (dispatch, user_id=null, view=undefined, sortby=undefined) => {
    dispatch({type: ActionTypes.LOADING})
    try{
        let currentUrl;
        switch(view){
            case "bookmarks":
                currentUrl = `posts/${user_id}/bookmarks`;
                break;
            case "likes":
                currentUrl = `posts/${user_id}/likes`;
                break;
            case "admin":
                currentUrl = "admin/posts";
                break;
            default:
                currentUrl = "posts";
                break;
        }    
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: ActionTypes.FETCH_POSTS, payload: data})
    }
    catch(e){
        dispatch({type: ActionTypes.FAILED, payload: e})
    }
}

export const fetchSearch = async (query) => {
    try{
        let currentUrl = `search?q=${query}`
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            headers: config.headers,
        })
        let data = await res.json()
        return data
    }
    catch(e){
        // console.log(e)
    }    
}

export const fetchPost = async (postSlug, dispatch, isAuthenticated) => {
    dispatch({type: ActionTypes.LOADING})
    let currentUrl = isAuthenticated ? `posts/${postSlug}/authenticated` : `posts/${postSlug}`;
    if(isAuthenticated)
        config.headers["Authorization"] = "Bearer " + localStorage.getItem("AUTH_TOKEN") ?? sessionStorage.getItem("AUTH_TOKEN");
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: ActionTypes.FETCH_POST, payload: data})
        return {...data, loading: false}
    }
    catch(e){
        console.log(e)
        window.location.replace("/")
    }
}

export const engagePost = async (dispatch, postId, userId, engage) => {
    let currentUrl = `posts/${postId}/${userId}/${engage}`
    let post = {
        postId,
        userId
    }
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            headers: config.headers,
            method: 'PUT',
            body: JSON.stringify(post)
        })
        let data = await res.json()
        dispatch({type: ActionTypes.POST_ENGAGE, payload: data})
        return data;
    }
    catch(e){
        dispatch({type: ActionTypes.FAILED, payload: e})
    }
}

// export const deletePost = async (post_id, dispatch) => {
//     let currentUrl = `posts/${post_id}`
//     try{
//         // let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
//         //     method: "DELETE",
//         //     headers: config.headers,
//         // })
//         let data = {message: "DELETED"}//await res.json()
//         dispatch({type: ActionTypes.DELETE_POST, payload: data})
//     }
//     catch(e){
//         dispatch({type: ActionTypes.FAILED, payload: e})
//     }
// }


/****** */
// COMMENTS ACTIONS//
/******* */
export const fetchComments = async (post_id, dispatch) => {
    let currentUrl = `posts/${post_id}/comments`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: ActionTypes.FETCH_COMMENTS, payload: data})
    }
    catch(e){
        dispatch({type: ActionTypes.FAILED, payload: e})
    }
}

export const addComment = async (comment, dispatch) => {
    let currentUrl = `posts/${comment.postId}/comments`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: ActionTypes.ADD_COMMENT, payload: data})
    }
    catch(e){
        dispatch({type: ActionTypes.FAILED, payload: e})
    }
}

export const deleteComment = async (post_id, comment_id, dispatch) => {
    let currentUrl = `posts/${post_id}/comment/${comment_id}`
    try{
        await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: "DELETE",
            headers: config.headers,
        })
        let data = {message: "DELETED"}//await res.json()
        dispatch({type: ActionTypes.DELETE_COMMENT, payload: data})
    }
    catch(e){
        dispatch({type: ActionTypes.FAILED, payload: e})
    }
}

/****** */
// TAGS ACTIONS//
/******* */
export const fetchTags = async (dispatch) => {
    dispatch({type: ActionTypes.LOADING})
    let currentUrl = `tags`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: ActionTypes.FETCH_TAGS, payload: data})
    }
    catch(e){
        window.location.replace('/');
        dispatch({type: ActionTypes.FAILED, payload: e})
    }
}

export const fetchTag = async (dispatch, tagSlug) => {
    dispatch({type: ActionTypes.LOADING})
    let currentUrl = `tags/${tagSlug}`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: ActionTypes.FETCH_TAG, payload: data})
    }
    catch(e){
        window.location.replace('/tags');
        // dispatch({type: ActionTypes.FAILED, payload: e})
    }
}

export const followTag = async (tag_id, user_id) => {
    let currentUrl = `tags/${tag_id}/${user_id}/follow`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: "PUT",
            headers: config.headers,
        })
        let data = await res.json()
        // dispatch({type: ActionTypes.TAG_ENGAGE, payload: data})
        return data
    }
    catch(e){
        // dispatch({type: ActionTypes.FAILED, payload: e})
    }
}


// ADMIN SECTION
// POST
export const createPost = async (post) => {
    let currentUrl = `posts`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: "POST",
            body: JSON.stringify(post),
            headers: config.headers,
        })
        let data = await res.json()
        // dispatch({type: ActionTypes.FETCH_POST, payload: data})
        return data
    }
    catch(e){
        return {"error": e}
        // dispatch({type: ActionTypes.FAILED, payload: e})
        // return e.message;
        // window.location.replace("/admin/posts")
    }
}

export const updatePost = async (postId, post, dispatch) => {
    dispatch({type: "LOADING"})
    let currentUrl = `posts/${postId}/update`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: "PUT",
            body: JSON.stringify(post),
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: "EDIT_POST", payload: data})
    }
    catch(e){
        dispatch({type: ActionTypes.FAILED, payload: e})
        // window.location.reload()
    }
}

export const deletePost = async (postId, dispatch) => {
    let currentUrl = `posts/${postId}`
    // return "Post Deleted Successfully"
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: "DELETE",
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: ActionTypes.DELETE_POST, payload: data})
    }
    catch(e){
        // dispatch({type: ActionTypes.FAILED, payload: e})
        window.location.reload()
    }
}

// TAG
export const createTag = async (tag, dispatch) => {
    let currentUrl = `tags`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: "POST",
            body: JSON.stringify(tag),
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: ActionTypes.FETCH_TAG, payload: data})
    }
    catch(e){
        // dispatch({type: ActionTypes.FAILED, payload: e})
        window.location.replace("/admin/tags")
    }
}

export const updateTag = async (tagId, tag, dispatch) => {
    let currentUrl = `tags/${tagId}`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: "PUT",
            body: JSON.stringify(tag),
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: ActionTypes.FETCH_TAG, payload: data})
    }
    catch(e){
        // dispatch({type: ActionTypes.FAILED, payload: e})
        window.location.reload()
    }
}

export const deleteTag = async (dispatch, tag_id) => {
    let currentUrl = `tags/${tag_id}`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: "DELETE",
            headers: config.headers,
        })
        let data = await res.json()
        dispatch({type: ActionTypes.DELETE_TAG, payload: data})
    }
    catch(e){
        dispatch({type: ActionTypes.DELETE_TAG, payload: new Error("Unable to Delete the tag. Please try again!")})
        // return new Error("Unable to Delete the tag. Please try again!")
        // window.location.replace()
    }
}

export const adminDashboard = async () => {
    let currentUrl = `admin/dashboard`
    try{
        let res = await fetch(process.env.REACT_APP_BASE_URL + currentUrl, {
            method: "GET",
            headers: config.headers,
        })
        let data = await res.json()
        return data;
        // dispatch({type: ActionTypes.DELETE_TAG, payload: data})
    }
    catch(e){
        // dispatch({type: ActionTypes.DELETE_TAG, payload: new Error("Unable to Delete the tag. Please try again!")})
        return new Error("Unable to Delete the tag. Please try again!")
        // window.location.replace()
    }
}
