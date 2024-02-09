import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallBack";
import {socketInIt} from "../socket/index";
import { ACTIONS } from "../actions";
import freeice from "freeice";

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
    const addNewClient = useCallback(
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
          addNewClient(user ,()=>{

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


        
        const handleNewPeer = async ({peerId,createOffer,user:remoteUser})=>{

          //if socket already connected hai toh connect nai krna hai
          if(peerId in connections.current){
            return console.warn(`You are alredy connected with ${peerId} ${user.name}`)
          }

          //RTCPeerConnection is an js class which is used to establish the peer to peer connection between local device and remote peer present in broswser
          //creating new instance of rtcpeerconnection
          connections.current [peerId] = new RTCPeerConnection({
            //freeice library provide current turn and stun server 
            iceServers: freeice()
          });

          //handle new ice candidate
          connections.current[peerId].onicecandidate = (event)=>{
            socket.current.emit(ACTIONS.RELAY_ICE,{
              peerId,
              icecandidate: event.candidate
            })
          }

          //handle on track on this connection
          connections.current[peerId].ontrack = ({ streams:[remoteStream] })=>{
            addNewClient(remoteUser,()=>{
              if(audioElements.current[remoteUser.id]){
                audioElements.current[remoteUser.id].srcObject = remoteStream
              }
              else{
                let settled = false;
                const interval = setInterval(()=>{
                  if(audioElements.current[remoteUser.id]){
                    audioElements.current[remoteUser.id].srcObject = remoteStream;
                    settled = true;
                  }
                  if(settled){
                    clearInterval(interval);
                  }
                },1000)
              }
            })
          }

          //add local track to remote connections
          localMediaStream.current.getTracks().forEach(track =>{
            connections.current[peerId].addTrack(track,localMediaStream.current)
          })
        }

        socket.current.on(ACTIONS.ADD_PEER,handleNewPeer)


    },[])




      return {clients,provideRef}
};