import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallBack";

// const users = [
//   {
//     id:1,
//     name:"akshat"
//   },
//   {
//     id:2,
//     name:"jack"
//   }
// ];

//this client custom use State is an hook same as useState but like setClients it has second paramter which is a callback function
//we are using useStateWithCallback hook on befalf of useState hook which is an custom hook which will provide an call back 
//fuction which will call after any changes or updation in clients state
export function  useWebRTC (roomId , user){
  
    const [clients , updateClients] = useStateWithCallback([]);
    
    //audio elements to know the which player is playing of  which user
    const audioElements = useRef({});
    const connections = useRef({});
    const localMediaStream = useRef(null);



    const addNewClients = useCallback(
      (newClient ,cb)=>{
        const lookingFor = clients.find((client)=>client.id === newClient.id);
     
        if(lookingFor === undefined){
          updateClients( (prevClients)=> [...prevClients,newClient], cb);
        }
      },[clients,updateClients]
    )

    //capture media
    useEffect( ()=>{
      const startCapturing = async()=>{
        try{
          console.log("inside start capturing")
          localMediaStream.current = await navigator.mediaDevices.getUserMedia({
             audio:true
           });
        }
        catch(err){
          console.log(err)
        }}

        startCapturing().then( ()=>{
   
          //after capturing audio make the current user into clients
          addNewClients(user ,()=>{
            const localElement = audioElements.current[user.id];
            console.log("local element",localElement)
            if(localElement){
              localElement.volume = 0;
              localElement.srcObject = localMediaStream.current 
            }
          });
        });
    },[])

    const provideRef  = (instance , userId)=>{
      audioElements.current[userId] = instance;
      console.log(audioElements)
    };

      return {clients,provideRef}
};