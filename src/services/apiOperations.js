import {apiConnector} from '../services/apiConnector';
import {allEndPoints} from '../services/apiEndPoints';





export async function  sendOtp (email ){
    console.log("inside send otp")
   
       
        try{
            const result =   await apiConnector("POST" , allEndPoints.SEND_OTP ,  {email});
            console.log(result)
            
           }
           catch(err){
            console.log(err);
           }
        
       }

export async function verifyOtp(otp){
    const email = localStorage.getItem('email');

    try{
        const result = await apiConnector('POST',allEndPoints.VERIFY_OTP,{otp:otp , email:email});
        console.log(result);
    }
    catch(err){
        console.log(err);
    }

}
