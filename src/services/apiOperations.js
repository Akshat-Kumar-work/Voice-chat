import {apiConnector} from '../services/apiConnector';
import {allEndPoints} from '../services/apiEndPoints';
import { setEmail, setUser } from '../store/authSlice';





export  function  sendOtp (email ){

    console.log("inside send otp")

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
    console.log("inside verify otp")
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
