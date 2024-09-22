import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import {fetchUser} from './Api/ActionCreators'
// import {userReducer} from './Api/Reducers'

export function useUserDetails(d){
    const [details, setDetails] = useState(
        {
            "id": null,
            "name": "",
            "email": "",
            "email_verified_at": null,
            "avatar": "avatar.svg",
            "created_at": "",
            "updated_at": "",
            "isAdmin": 1,
            "access_token": "",
            "post_engagements": [
                {
                    "id": null,
                    "user_id": null,
                    "post_id": null,
                    "like": 0,
                    "bookmark": 0,
                    "created_at": "",
                    "updated_at": ""
                },
            ]
        }
    )
    useEffect(() => {
        if(details.id != null)
            localStorage.setItem("details", JSON.stringify(details))
        // console.log(JSON.parse(sessionStorage.getItem("details")))
    }, [details])
    return [details, setDetails]
}

export function useNavbarToggle(){
    const [isVisible, setVisible] = useState(false);
    return [isVisible, setVisible]
}

export const formatDate = date => {
    let week = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let d = new Date(Date.parse(date))
    return `${week[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}


export function usePageTracking() {
    const history = useNavigate();
    const [initialized, setInitialized] = useState(false);

    // useEffect(() => {
    //     if (!initialized) {
    //         initialiseAnalytics();
    //         setInitialized(true);
    //     }
    // }, []);

    useEffect(() => {
        if (initialized) {
            history.listen((loc, action) => {
                ReactGA.send({ hitType: "pageview", page: loc.pathname + loc.search, title: window.title });
            })
        }
        else {
            initialiseAnalytics();
            setInitialized(true);
        }
    }, [initialized, history]);
}