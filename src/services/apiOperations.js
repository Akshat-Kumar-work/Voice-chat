import {apiConnector} from '../services/apiConnector';
import {allEndPoints} from '../services/apiEndPoints';
import { setEmail, setUser } from '../store/authSlice';
import { setAvatar,setName } from '../store/activateSlice';






export  function  sendOtp (email ){

    console.log("inside send otp from api operations")

   return async(dispatch)=>{
    try{
        const result =   await apiConnector("POST" , allEndPoints.SEND_OTP ,  {email});
        dispatch(setEmail(email))
        dispatch(setEmail(result.data.email));
       }
       catch(err){
        console.log(err);
       }
   }
       }

export  function verifyOtp(otp , email){
    console.log("inside verify otp from api operation")
   return async(dispatch)=>{
    try{
        const result = await apiConnector('POST',allEndPoints.VERIFY_OTP,{otp:otp , email:email});
        console.log(result);
        dispatch(setUser(result.data.user))
    }
    catch(err){
        console.log(err);
    }
   }

}

export function activateUser(formData ,userName){
    console.log("inside img string of api operations",{formData,userName})

    return async(dispatch)=>{
     try{
        formData.append("userName",userName)
         const result = await apiConnector('POST',allEndPoints.ACTIVATE_USER,formData,{
            "Content-Type":"multipart/form-data"
         });
         console.log("activate user result",result);
         if(result.data.auth){
            dispatch(setUser(result.data.UpdatedUser));
            dispatch(setAvatar(result.data.UpdatedUser.avatar));
            dispatch(setName(result.data.UpdatedUser.userName))
         }
        
     }
     catch(err){
         console.log(err);
     }
    }
}




