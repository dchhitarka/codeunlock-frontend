import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { verify } from '../../api/ActionCreators';
import Loading from '../Utility/Loading';

const Verified = () => {
    const {hash, email_hash} = useParams()
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState({status: false, msg: undefined});
    const [failed, setFailed] = useState({status: false, err: undefined});
    const history = useNavigate();

    useEffect(() => {
        async function verification(){
            const res = await verify(hash, email_hash);
            if(res.status){
                setLoading(false);
                setSuccess({status: true, msg: res.message});
            }
            else{
                setFailed({status: true, err: res.error})
            }
        }
        verification();
    })
    return (
        <div>
        {loading && <Loading />}
        {success && history.push({pathname: '/u/login', state: {msg: success.msg}})}
        {failed.status && history.push({pathname: '/u/verify', state: {error: failed.err}})}
        </div>
    )
}

export default Verified;