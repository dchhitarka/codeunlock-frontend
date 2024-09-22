import React, { useState } from 'react';
import { sendMailForVerification } from '../../api/ActionCreators';
import Loading from '../Utility/Loading';

const Verify = ({...props}) => {
    const {msg} = props?.props;
    const [email, setEmail] = useState("")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("")

    const submitForm = e => {
        e.preventDefault()
        if(email === "" ){
            setErr("Email can't be empty")
        }
        else{
            async function verification(){
                setErr(null)
                setLoading(true);
                const res = await sendMailForVerification(email);
                if(res.status){
                    setLoading(false);
                    setSuccess(res.message);
                }
                else{
                    setErr(res.error)
                }
                setLoading(false);
            }
            verification();    
        }
    }

    return (
        <div className="login">
            {loading && <Loading />}
            <form className="login-form" onSubmit={submitForm}>
                <div className="form-header" style={{ "textAlign": "center", paddingTop: "10px"}}>
                    <div className="form-heading">Account Verification</div>
                    <div className="form-error" style={{color: "red"}}>{err}</div>
                    <div className="form-error" style={{color: "green"}}>{msg}</div>
                    <div className="form-error" style={{color: "green"}}>{success}</div>
                </div>
                {/* {sendmail && (
                    <> */}
                <div className="form-header">
                    <div className="form-error" style={{color: "black"}}>Resend Verification Mail</div>
                </div>
                <div className="form-input">
                    <label className="form-label">Email</label>
                    <input type="email" value={email} name="email" id="email" placeholder="user@account.com" onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div className="form-submit">
                    <button className="form-button login-button active-button">SEND</button>
                </div>
                    {/* </>
                )} */}
            </form>
        </div>
    )
}

export default Verify;