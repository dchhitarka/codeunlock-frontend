import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const Admin = lazy(() => import('../../components/Admin/Admin'));
const Posts = lazy(() => import('../../components/Admin/Posts'));
const NewPost = lazy(() => import('../../components/Admin/NewPost'));
const EditPost = lazy(() => import('../../components/Admin/Post'));
const Preview = lazy(() => import('../../components/Admin/Post').then(module => ({ default: module.Preview })));
const Tags = lazy(() => import('../../components/Admin/Tags'));
const Tag = lazy(() => import('../../components/Admin/Tag'));
const Users = lazy(() => import('../../components/Admin/Users'));

function AdminPage() {
    const {user} = useUserContext();
    if(user?.isAdmin !== 1){
        <Navigate to="/" />
    }

    return (
        <Routes>
            <Route path='posts' element={<Posts/>} />
            <Route path='tags' element={<Tags/>} />
            <Route path="users" element={<Users/>} />
            <Route path='post/create' element={<NewPost/>} />
            <Route path='posts/:post' element={<EditPost/>} />
            <Route path='post/preview' element={<Preview />} />
            <Route path='tags/:tag' element={<Tag/>} />
            <Route path='' element={<Admin/>} />
        </Routes>
  )
}

export default AdminPage