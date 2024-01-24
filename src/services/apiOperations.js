import {apiConnector} from '../services/apiConnector';
import {allEndPoints} from '../services/apiEndPoints';
import { setEmail, setUser } from '../store/authSlice';







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

export function activateUser(name,image){
    console.log("inside activate user from api operations")
    return async(dispatch)=>{
     try{

         const result = await apiConnector('POST',allEndPoints.ACTIVATE_USER,{name:name, avatar:image});
         console.log("activate user result",result);
         //dispatch(setUser(result.data.user))
     }
     catch(err){
         console.log(err);
     }
    }
}
