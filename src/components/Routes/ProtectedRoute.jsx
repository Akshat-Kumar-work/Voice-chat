
import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const ProtectedRoute = ({children}) => {
  const {isAuth , user} = useSelector( (state)=>state.auth);

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