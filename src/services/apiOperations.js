import {apiConnector} from '../services/apiConnector';
import {allEndPoints} from '../services/apiEndPoints';
import { setEmail, setUser } from '../store/authSlice';
import { setAvatar,setName } from '../store/activateSlice';
import { setRooms } from '../store/RoomsSlice';

const BASE_URL = process.env.REACT_APP_BASE_URL;



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
        dispatch(setUser(result.data.user));
        if(result.data.user.activated){
            dispatch(setAvatar(result.data.user.avatar));
            dispatch(setName(result.data.user.userName))
        }
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

export function logoutUser(){
    return async(dispatch)=>{
        try{
            const logoutData = await apiConnector('POST',allEndPoints.LOGOUT_USER);
            if(logoutData){
                dispatch(setUser(null));
                dispatch(setAvatar(''));
                dispatch(setName(''));
                dispatch(setEmail(''));
            }
            
        }
        catch(err){
            console.log(err);
        }
    }
}

export async function  createRoom(type,topic,navigate){
    console.log(type,topic)
    try{
        const response = await apiConnector('POST',allEndPoints.CREATE_ROOM ,{type,topic});
        console.log(response);
        const id = response.data.room._id;
        if(response){
            navigate(`/room/${id}`)
        }
    }
    catch(err){
        console.log(err); 
    }

}

export  function fetchRooms(){
   return async (dispatch)=>{
    try{
        const response = await apiConnector('GET',allEndPoints.FETCH_ROOMS);
       
        if(response)
        { dispatch(setRooms(response.data.roomsList))}
    }
    catch(err){
        console.log(err)
    }
   }
    
}

export async function getSingleRoom(roomId){
    try{
        const result = await apiConnector('GET', BASE_URL+`/api/fetchSingleRoom/${roomId} `)
        // console.log("data from single room",result.data.data)
        return result.data.data
    }
    catch(err){
console.log("error while fetching single room",err)
    }
}



