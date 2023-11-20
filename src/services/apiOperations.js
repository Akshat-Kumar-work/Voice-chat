import {apiConnector} from '../services/apiConnector';
import {allEndPoints} from '../services/apiEndPoints'



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
