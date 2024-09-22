import React, { useState } from 'react';
import { forgot } from '../../api/ActionCreators';

export default function ForgotPassword(){
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState(null);
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const submitForm = async e => {
        e.preventDefault();
        setIsLoading(true);
        let res = await forgot(email)
        // console.log(res);
        setMsg(res?.message ?? null)
        setErr(res?.error ?? null)
        setIsLoading(false);
    }

    return (
        <div className="login">
            <form className="login-form" onSubmit={submitForm}>
                <div className="form-header">
                    <div className="form-heading">RESET YOUR PASSWORD</div>
                    <div className="form-error">{err}</div>
                    <div className="form-error" style={{color: "green"}}>{msg}</div>
                </div>

                <div className="form-input">
                    <label className="form-label">Email</label>
                    <input type="email" value={email} name="email" id="email" placeholder="user@account.com" onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div className="form-submit">
                    <button className="form-button login-button active-button">
                        {isLoading ? 'Sending...' : 'SUBMIT'}
                    </button>
                </div>
            </form>
        </div>
    )
}
