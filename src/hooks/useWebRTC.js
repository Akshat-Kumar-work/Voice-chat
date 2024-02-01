import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallBack";
import {socketInIt} from "../socket/index";
import { ACTIONS } from "../actions";

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


  //socket vairable
  const socket = useRef(null);

      

  useEffect( ()=>{
    //creating new socket and putting its value into socket variable
    socket.current = socketInIt();
  },[]);


    const [clients , updateClients] = useStateWithCallback([]);
    

    //audioElements is an empty object created using useRef hook
    const audioElements = useRef({});
    //here the audioPlayer instance with userId is assigned to the audioElements as key value pair , key as userId and value is audio player instance
    const provideRef  = (AudioPlayerInstance , userId)=>{
      //{ userId:audioPlayerInstance}
      //in simple we are storing audioPlayer of currentUser with key as User Id
      audioElements.current[userId] = AudioPlayerInstance;
    };


    const connections = useRef({});

    //created localMediaStream variable -> to capture the audio from the user device
    const localMediaStream = useRef(null);



    //function to add new client same as updateClients with some conditions
    const addNewClients = useCallback(
      (newClient ,cb)=>{
        //checking if client already present in clients state 
        const lookingFor = clients.find((client)=>client.id === newClient.id);
        
        //if client is not present then add it
        if(lookingFor === undefined){
          updateClients( (prevClients)=> [...prevClients,newClient], cb);
        }
      },[clients,updateClients] );

    //capture media
    useEffect( ()=>{
      const startCapturing = async()=>{
        try{
          console.log("inside start capturing")
          //this navigator.mediaDevices.getUserMedia return MediaStream object once user grants permission 
          //It does not directly "record" audio. Instead, it captures audio from the user's device and stores it in the localMediaStream varibale
          localMediaStream.current = await navigator.mediaDevices.getUserMedia({
             audio:true
           });
        }
        catch(err){
          console.log(err)
        }}

        //when startCapturing is done
        startCapturing().then( ()=>{
   
          //after capturing audio add the current user into clients using addNewClients function which built above to add current client into the clients state
          addNewClients(user ,()=>{

            //after adding the current client/user into the clients state
            //getting current user audio player by using it Id from audioElements object
            const localElement = audioElements.current[user.id];
        
            //if localElement got the audioplayer of current client
            if(localElement){
              //current user k audio player ki volume zero krdo taki usko khud ki awaz echo n ho
              localElement.volume = 0;
              //audioPlayer k andar ek srcObject hota hai same as img src , usko update kara hai  => jo audio capture kar rahe hai current user k device se uss seee
              localElement.srcObject = localMediaStream.current 
            }

            //socket-> joining client  with web socket
            socket.current.emit(ACTIONS.JOIN,{roomId,user});

          });
        });
    },[])




      return {clients,provideRef}
};