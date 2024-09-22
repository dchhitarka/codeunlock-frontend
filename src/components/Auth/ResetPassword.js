import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { reset, update } from '../../api/ActionCreators';


export default function ResetPassword(){
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState({})
    const history = useNavigate();
    
    useEffect(() => {
        async function init(){
            return await reset(hash)
        }
        init().then(res => setStatus(res));
        setLoading(false)
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(status?.status === 410){
            // console.log(status)
            history.push({pathname: '/u/login', state: {err: status.error}})
        }
        else{
            setMsg(status?.message ?? null)
            setErr(status?.error ?? null)        
        }
    // eslint-disable-next-line
    }, [status])
    
    const {hash} = useParams();
    const [password, setPassword] = useState(undefined);
    const [confirmPassword, setConfirmPassword] = useState(undefined);
    const [msg, setMsg] = useState(null);
    const [err, setErr] = useState(null);
    // eslint-disable-next-line
    const [color, setColor] = useState("rgba(0,0,0,0.2)")
    const [confirmColor, setConfirmColor] = useState("rgba(0,0,0,0.2)")
    const [help, setHelp] = useState(undefined);

    const submitForm = async e => {
        e.preventDefault()
        if(password !== confirmPassword){
            setErr("")
            setMsg("")
        }
        let res = await update(hash, password)
        setMsg(res?.message ?? null)
        setErr(res?.error ?? null)
    }

    return (
        <div className="login">
        {loading && <Loading />}
        <form className="login-form" onSubmit={submitForm}>
            <div className="form-header">
                <div className="form-heading">RESET YOUR PASSWORD</div>
                <div className="form-error">{err}</div>
                <div className="form-error" style={{color: "green"}}>{msg}</div>
            </div>

            <div className="form-input">
                <label className="form-label">New Password</label>
                <input type="password" value={password} name="password" id="password" onChange={e => {
                    setPassword(e.target.value)
                    if(e.target.value.length < 5){
                        setColor("red")
                        setHelp("Password must be greater than 5 characters")
                    }else{
                        setColor("green")
                        setHelp("")
                    }
                    if(confirmPassword !== ""){
                        if(confirmPassword === password){
                            setConfirmColor("green")
                            setHelp("Password Confirmed")
                        }else{
                            setConfirmColor("red")
                            setHelp("Password does not match")
                        }
                    }
                }} required/>
            </div>
            <div className="password-msg" style={{color: confirmColor, fontSize: "12px", marginLeft: "8px"}}>{help}</div>

            <div className="form-input">
                <label className="form-label">Confirm New Password</label>
                <input type="password" value={confirmPassword} name="cpassword" id="cpassword" onChange={e => {
                    setConfirmPassword(e.target.value)
                    if(e.target.value !== ""){
                        if(e.target.value === password){
                            setConfirmColor("green")
                            setHelp("Password Confirmed")
                        }else{
                            setConfirmColor("red")
                            setHelp("Password does not match")
                        }
                    }
                }} required/>
            </div>
            <div className="password-msg" style={{color: confirmColor, fontSize: "12px", marginLeft: "8px"}}>{help}</div>

            <div className="form-submit">
                <button className="form-button login-button active-button">RESET</button>
            </div>
        </form>
    </div>

    )
}
