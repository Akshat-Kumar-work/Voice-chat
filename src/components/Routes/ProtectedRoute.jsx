import React, { Children } from 'react'
import { Navigate } from 'react-router-dom';

const user={
    activated:false
}

const isAuth = true;

const ProtectedRoute = ({children}) => {
 if(!isAuth){
    return <Navigate to="/"/>
 }
 if(isAuth && !user.activated){
    return <Navigate to="/activate"/>
 }
 else{
    return children;
 }
}

export default ProtectedRoute