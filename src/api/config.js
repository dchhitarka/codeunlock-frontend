import user from "../auth/UserAuth"

export const config = {
    "AUTH_TOKEN": localStorage.getItem("AUTH_TOKEN") ?? sessionStorage.getItem("AUTH_TOKEN") ?? user?.token ?? "",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': "application/json",//x-www-form-urlencoded", //'multipart/form-data',
        'Authorization': "Bearer " + localStorage.getItem("AUTH_TOKEN") ?? sessionStorage.getItem("AUTH_TOKEN") ?? user?.token ?? "",
        'Accept': 'application/json'
    }
}