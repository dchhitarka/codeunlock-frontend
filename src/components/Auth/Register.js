import React, { useReducer, useState } from 'react'
// import user from './UserAuth'
import { Link, useNavigate } from 'react-router-dom'
import { userRegister } from "../../api/ActionCreators"
import { userReducer } from '../../api/Reducers'
import '../../css/Auth.css'
import Loading from "../Utility/Loading"

export default function Register(){
    const [color, setColor] = useState("rgba(0,0,0,0.2)")
    const [confirmColor, setConfirmColor] = useState("rgba(0,0,0,0.2)")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        cPassword: "",
        accept: true,
    })
    
    const [reg, dispatch] = useReducer(userReducer, {loading: false})
    const history = useNavigate()

    // useEffect(() =>{
    //     if(data.password === data.cPassword){
    //         console.log("Password Does not match")
    //     }
    // }, [data.password, data.cPassword])
    
    const [err, setErr] = useState({
        passwordErr: "",
        confirmPassErr: "",
        formErr: ""
    })
    return (
        <div className="register">
            {reg.loading 
            ? <Loading />
            :
            <form className="register-form" onSubmit={e => {
                e.preventDefault()
                if(data.email === "" || data.password === ""){
                    setErr({...err, formErr: "Email or Password can't be empty"})
                }
                else{
                    setErr({...err, formErr: ""})
                    userRegister(data, dispatch)
                    .then(res => {
                        if(res.status)
                            history.push({pathname: "/u/verify", state: {msg: "You are registered successfully! Click on the link sent to your mail to verify your account.", sendmail: false}})
                        else 
                            setErr({...err, formErr: res.message})
                    })
                    .catch(err => setErr({...err, formErr: err.message}))
                }   
            }}>
                <div className="form-header">
                    <div className="form-heading">REGISTER</div>
                    <div className="form-error">{err.formErr}</div>
                </div>

                <div className="form-input">
                    <label className="form-label">Name</label>
                    <input type="text" value={data.name} name="name" id="name" placeholder="" onChange={e => setData({...data, name: e.target.value})} required/>
                </div>

                <div className="form-input">
                    <label className="form-label">Email</label>
                    <input type="email" value={data.email} name="email" id="email" placeholder="user@account.com" onChange={e => setData({...data, email: e.target.value})} required/>
                </div>

                <div className="form-input">
                    <label className="form-label">Password</label>
                    <input type="password" value={data.password} name="password" id="password" style={{borderColor: color}} onChange={e => {
                        setData({...data, password: e.target.value})
                        if(e.target.value.length < 5){
                            setColor("red")
                            setErr({...err, passwordErr: "Password must be greater than 5 characters"})
                        }else{
                            setColor("green")
                            setErr({...err, passwordErr: "Password is greater than 5 characters"})
                        }
                        if(data.cPassword !== ""){
                            if(data.cPassword === data.password){
                                setConfirmColor("green")
                                setErr({...err, confirmPasswordErr: "Password Confirmed"})
                            }else{
                                setConfirmColor("red")
                                setErr({...err, confirmPasswordErr: "Password does not match"})
                            }
                        }
                    }} required/>
                </div>
                <div className="password-msg" style={{color: color, fontSize: "12px", marginLeft: "8px"}}>{err.passwordErr}</div>
                
                <div className="form-input">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" value={data.cPassword} name="password" id="cpassword" style={{borderColor: confirmColor}} onChange={e => {
                        setData({...data, cPassword: e.target.value})
                        if(e.target.value !== ""){
                            if(e.target.value === data.password){
                                setConfirmColor("green")
                                setErr({...err, confirmPasswordErr: "Password Confirmed"})
                            }else{
                                setConfirmColor("red")
                                setErr({...err, confirmPasswordErr: "Password does not match"})
                            }
                        }
                    }} required/>
                </div>
                <div className="password-msg" style={{color: confirmColor, fontSize: "12px", marginLeft: "8px"}}>{err.confirmPasswordErr}</div>

                <div className="form-input form-foot">
                    <label className="form-label remember">
                        <input type="checkbox" value={data.accept} required name="accept" id="accept" onChange={e => setData({...data, accept: e.target.checked})}/>
                        <span>Accept <a target="_blank" rel="noopener noreferrer" href="https://www.termsandconditionsgenerator.com/live.php?token=wvWK6xVNeRGwwnlnNeymBSSOKRmcrvAM" style={{color: "blue"}}>Terms and Conditions</a></span>
                    </label> 
                </div>

                <div className="form-submit">
                    <button className="form-button register-button active-button">REGISTER</button>
                    <Link to="/u/login"><button className="form-button login-button unactive-button">LOGIN</button></Link>
                </div>
            </form>
            }
        </div>
    )
}