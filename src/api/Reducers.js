import * as ActionType from './ActionTypes'

export const postReducer = (state, action) => {
    switch(action.type){
        case ActionType.LOADING:
            return {loading: true}
        case ActionType.FETCH_POSTS:
            return {posts: action.payload, loading: false, error: false}
        case ActionType.FETCH_POST:
            return {...action.payload, loading: false, error: false}
        case "EDIT_POST":
            return {...action.payload, loading: false, error: false}
        case ActionType.POST_ENGAGE:
        case ActionType.DELETE_POST:
            return {...action.payload, loading: false, error: false}
        case ActionType.FAILED:
            return {msg: action.payload, loading: false, error: true}
        default:
            return state
    }
}

export const tagReducer = (state, action) => {
    switch(action.type){
        case ActionType.LOADING:
            return {...state, loading: true}
        case ActionType.FETCH_TAGS:
            return {tags: action.payload, loading: false}
        case ActionType.DELETE_TAG:
        case ActionType.FETCH_TAG:
        case ActionType.TAG_ENGAGE:
        case ActionType.FAILED:
            // console.log(action.payload)
            return {...action.payload, loading: false}
        default:
            return state
    }
}

export const userReducer = (state, action) => {
    switch(action.type){
        case ActionType.LOADING:
            return {...state, loading: true, error: false}
        case ActionType.FETCH_USERS:
            return action.payload
        case ActionType.FETCH_USER:
            return {user: action.payload, loading: false, error: false}
        case ActionType.DELETE_USER:
        case ActionType.FAILED:
            return {user: null, msg: action.payload, loading: false, error: true}
        case "STOP_LOADING":
            return { ...state, loading: false, error: false }
        default:
            return state
    }
}

export const commentReducer = (state, action) => {
    switch(action.type){
        // case ActionType.LOADING:
        //     return {...state, loading: true}
        case ActionType.FETCH_COMMENTS:
        case ActionType.DELETE_COMMENT:
        case ActionType.ADD_COMMENT:
        case ActionType.FAILED:
            return action.payload
        default:
            return state
    }
}