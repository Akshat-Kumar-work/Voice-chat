import React from 'react'
import { Navigate } from 'react-router-dom'

const isAuth = true;
const user = {
    activated: false
}
const SemiProtectedRoute = ({children}) => {

    console.log("inside semi protected")

    //agar authenticated user nai hai toh home par jao
     if(!isAuth){
        return (<Navigate to="/"/>)
     }
    
    //agar authenticated hai par activated nai hai toh activation vala render kro
     if(isAuth && !user.activated){
        return (children);
     }
    //agar authenticated hai activated hai rooms show kro
    else{
      return  <Navigate to="/rooms"/>
    }

}

export default SemiProtectedRoute