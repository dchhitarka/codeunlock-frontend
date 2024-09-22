import React, { useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from "../../api/ActionCreators"
import { userReducer } from '../../api/Reducers'
import UserAuth from '../../auth/UserAuth'
import { useUserContext } from '../../context/UserContext'
import '../../css/Auth.css'
import Loading from "../Utility/Loading"

export default function Login(props){
    const { user, setUser } = useUserContext();
    const [login, dispatch] = useReducer(userReducer, {
        loading: false,
    })

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(true)
    const [err, setErr] = useState(props?.location?.state?.err || "")
    const [msg, setMsg] = useState(() => {
        return (props.state && props.state.msg) || "";
    })

    const navigate = useNavigate()
    console.log(err);
    
    useEffect(() => {
        console.log(login);
        
        if(!login?.error && login.user){
            UserAuth.login(login.user, remember).then((res) => {
                setUser(res);
                localStorage.setItem('AUTH_TOKEN', login.user.access_token);
                navigate(-1);
            })
        }
        else if(login?.error){
            setErr(`${login?.msg?.message ?? ""}`)
            if(login?.msg?.message?.indexOf("Account not verified") > -1){
                navigate("/u/verify", { state:{msg: "Verify your account", sendmail: true}})
            }
        }
    // eslint-disable-next-line
    }, [login])

    const submitForm = e => {
        e.preventDefault()
        setMsg(null)
        if(email === "" || password === ""){
            setErr("Email or Password can't be empty")
        }
        else{
            setErr(null)
            userLogin({email, password, remember}, dispatch)
        }
    }

    return (
        <div className="login">
            {login.loading ? <Loading />
            : <form className="login-form" onSubmit={submitForm}>
                <div className="form-header">
                    <div className="form-heading">LOGIN</div>
                    <div className="form-error">{props?.location?.state?.err || err}</div>
                    <div className="form-error" style={{color: "green"}}>{msg}</div>
                </div>
                <div className="form-input">
                    <label className="form-label">Email</label>
                    <input type="email" value={email} name="email" id="email" placeholder="user@account.com" onChange={e => setEmail(e.target.value)} required/>
                </div>

                <div className="form-input">
                    <label className="form-label">Password</label>
                    <input type="password" value={password} name="password" id="password" onChange={e => setPassword(e.target.value)} required/>
                </div>

                <div className="form-input form-foot">
                    <label className="form-label remember">
                        <input type="checkbox" value={remember} name="remember" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)}/>
                        <span>Remember Me</span>
                    </label>
                    <Link to="/u/forgot" style={{color: "blue"}}>Forgot Password</Link>
                </div>

                <div className="form-submit">
                    <button className="form-button login-button active-button">LOGIN</button>
                    <Link to="/u/register"><button className="form-button register-button unactive-button">REGISTER</button></Link>                    
                </div>
            </form>
            }
        </div>
    )
}