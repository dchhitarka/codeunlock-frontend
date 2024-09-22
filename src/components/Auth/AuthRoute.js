import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
const Login = lazy(() => import('./Login'))
const Register = lazy(() => import('./Register'))
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const ResetPassword = lazy(() => import('./ResetPassword'));
const Verify = lazy(() => import('./Verification'));
const Verified = lazy(() => import('./Verified'));


function AuthRoute() {
    const user = useUserContext();
    if(user?.isAuthenticatd){
        <Navigate to="/" />
    }
  return (
    <Routes>
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
        <Route path='verify' element={<Verify />} />
        <Route path='verify/:hash/:email_hash' element={<Verified/>} />
        <Route path='forgot' element={<ForgotPassword/>} />
        <Route path='reset/:hash' element={<ResetPassword/>} />
    </Routes>
  )
}

export default AuthRoute