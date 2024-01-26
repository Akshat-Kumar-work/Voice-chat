import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEmail, setUser } from '../store/authSlice';
import { setAvatar,setName } from '../store/activateSlice';

export function useLoadingWithRefresh(){
    const dispatch = useDispatch();
    const [loading , setloading] = useState(true);
    useEffect( ()=>{
    (async ()=>{
        try{
       const {data}=  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/refresh`,{},{withCredentials:true});
       console.log(data)
        dispatch(setUser(data.user));
        dispatch(setAvatar(data.user.avatar));
        dispatch(setName(data.user.userName))
        dispatch(setEmail(data.user.email))

        setloading(false);
        }
        catch(err){
            console.log(err);
            setloading(false)
        }
    })();
    },[]);

    return {loading}
}