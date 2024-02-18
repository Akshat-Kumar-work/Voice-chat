import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useWebRTC } from '../hooks/useWebRTC';


const CreatedRoom = () => {
  //getting room id from the parameter
  const {id:roomId} = useParams();
  //getting logged in user 
  const {user} = useSelector( (state)=>state.auth);


  //destructuring the clients state from custom client useState
  const {clients , provideRef} = useWebRTC(roomId,user);
  console.log("clients",clients)

  return (
    <div >
      <h1>All connected clients</h1>
      {
        clients.map( (singleClient)=>{
          return (<div key={singleClient._id} className=' bg-pink-200 w-[100px] h-[100px] rounded-[50%]'>

            {/* audio element of react to play audio-=> single client k lie ek audio Player hi render hoga */}
            {/* providing audio player instance and client id to know which user audio player it is */}
            {/* audio player ka instance lelia with client id taki pta chale kis client ka audio player  hai */}
            <audio  ref={ (instance)=>provideRef(instance,singleClient.id) }
               autoPlay ></audio>
              <img src={singleClient.avatar} className=' w-[100%] h-[100%] rounded-[50%] '/>
            <h4>{singleClient.userName}</h4>
          </div>)
        })
      }
    </div>
  )
}

export default CreatedRoom