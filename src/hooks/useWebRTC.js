import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallBack";
import {socketInIt} from "../socket/index";
import { ACTIONS } from "../actions";
import freeice from  "freeice";



//this client custom use State is an hook same as useState but like setClients it has second paramter which is a callback function
//we are using useStateWithCallback hook on befalf of useState hook which is an custom hook which will provide an call back 
//fuction which will call after any changes or updation in clients state
export function  useWebRTC (roomId , user){


  //socket vairable
  const socket = useRef(null);

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




      

  useEffect( ()=>{
    //creating new socket and putting its value into socket variable
    socket.current = socketInIt();
  },[]);





    //function to add new client same as updateClients with some conditions
    const addNewClient = useCallback(
      (newClient ,cb)=>{
        //checking if client already present in clients state 
        const lookingFor = clients.find((client)=>client.id === newClient.id);
        
        //if client is not present then add it
        if(lookingFor === undefined){
          updateClients( (prevClients)=> [...prevClients,newClient], cb);
          console.log("after updating clients",clients)
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
          addNewClient({...user} ,()=>{

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

        return()=>{
        //leaving the room
        localMediaStream.current.getTracks().forEach(track=>track.stop());
        socket.current.emit(ACTIONS.LEAVE,{roomId});
        }

    },[]);


    //handle new peer
    useEffect( ()=>{
      const handleNewPeer = async ({peerId,createOffer,user:remoteUser})=>{
        console.log("inside handle new peer")
        //if socket already connected hai toh connect nai krna hai
        if(peerId in connections.current){
          return console.warn(`You are alredy connected with ${peerId} ${user.name}`)
        }

        //RTCPeerConnection is an js class which is used to establish the peer to peer connection between local device and remote peer present in broswser
        //creating new instance of rtcpeerconnection
        //rtcpeerconnection is responsible to establish connection 
        connections.current [peerId] = new RTCPeerConnection({
          //freeice library provide current turn and stun server 
          iceServers: freeice()
        });

        //handle new ice candidate
        //ice candidate represent network address
        //icecandidate is generated by local peer's rtcpeerconnection
        // ice candidate are information pieces of network used by rtcpeerconnection 
        //we can say that ice candidate have many info like, ip adress, local port,candidate id etc
        //ICE candidate represents a potential network path through which the peer can establish a direct connection with its remote peer.
        connections.current[peerId].onicecandidate = (event)=>{
          socket.current.emit(ACTIONS.RELAY_ICE,{
            peerId,
            icecandidate: event.candidate
          })
        }

        //handle on track on this connection
        connections.current[peerId].ontrack = ({ streams:[remoteStream] })=>{
          addNewClient({...remoteUser},()=>{
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
              },300)
            }
          })
        }

        //add local track to remote connections, sending our voice stream to another peer/connection
        localMediaStream.current.getTracks().forEach(track =>{
          connections.current[peerId].addTrack(track,localMediaStream.current)
        })

        //create offer
        if(createOffer){
          const offer = await connections.current[peerId].createOffer();
          await connections.current[peerId].setLocalDescription(offer)
          //send offer to another client
          socket.current.emit(ACTIONS.RELAY_SDP,{
            peerId,sessionDescription:offer
          })
        }

      }

      
      socket.current.on(ACTIONS.ADD_PEER,handleNewPeer);

      return()=>{
        socket.current.off(ACTIONS.ADD_PEER);

      }
    },[]);


    //handle ice candidate
    useEffect( ()=>{
      socket.current.on(ACTIONS.ICE_CANDIDATE,( {peerId,icecandidate})=>{
        if(icecandidate){
          connections.current[peerId].addIceCandidate(icecandidate);
        }
      })

      return()=>{
        socket.current.off(ACTIONS.ICE_CANDIDATE)
      }
    },[]);

    
    //handle sdp
    useEffect( ()=>{
      const handleRemoteSdp = async({peerId,sessionDescription : remoteSessionDescription} )=>{
        connections.current[peerId].setRemoteDescription(new RTCSessionDescription(remoteSessionDescription));
        
        //if session description is type of offer so create ans
        if(remoteSessionDescription.type === 'offer'){
          const connection = connections.current[peerId];
          const answer = await connection.createAnswer();
          connection.setLocalDescription(answer);

          socket.current.emit(ACTIONS.RELAY_SDP,{peerId,sessionDescription:answer})
        }
      }
      socket.current.on(ACTIONS.SESSION_DESCRIPTION,handleRemoteSdp);

      return()=>{
        socket.current.off(ACTIONS.SESSION_DESCRIPTION);
      }
    },[]);

    //handle remove peer
    useEffect( ()=>{
      const handleRemovePeer = async({peerId,userId})=>{
        if(connections.current[peerId]){
          connections.current[peerId].close();
        }
        delete connections.current[peerId];
        delete audioElements.current[peerId];
        updateClients(list=> list.filter(client => client.id !== userId));
      }
      socket.current.on(ACTIONS.REMOVE_PEER,handleRemovePeer)

      return()=>{
        socket.current.off(ACTIONS.REMOVE_PEER)
      }
    },[])



      return {clients,provideRef}
};