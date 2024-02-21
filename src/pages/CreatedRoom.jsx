
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useWebRTC } from '../hooks/useWebRTC';
import { IoMdArrowDropleft } from "react-icons/io";
import { HiHandRaised } from "react-icons/hi2";
import { ImExit } from "react-icons/im";
import { CiMicrophoneOn } from "react-icons/ci";
import { CiMicrophoneOff } from "react-icons/ci";
import { useEffect, useState } from 'react';
import {getSingleRoom} from "../services/apiOperations";



const CreatedRoom = () => {
  //getting room id from the parameter
  const {id:roomId} = useParams();
  //getting logged in user 
  const {user} = useSelector( (state)=>state.auth);

  const navigate = useNavigate();

  //destructuring the clients state from custom client useState -> roomId & current user is passed into the useWebRTc
  const {clients , provideRef, handleMute} = useWebRTC(roomId,user);

  
  
  const [roomTopic,setRoomTopic] = useState(null);


  const [isMute,setMute] = useState(true);

  useEffect( ()=>{
    handleMute(isMute , user._id);
  },[isMute])

  useEffect( ()=>{
    const fetchRoom  = async()=>{
      const data = await getSingleRoom(roomId)
      
      setRoomTopic(data.topic)
    }
    fetchRoom();
   
  },[roomId])

  const handleMuteClick = ( clientId)=>{

   
    //if client id is not current client then do not mute-> preventing others client mute functinonality
    if(clientId !== user._id){
      return ;
    }
    setMute( (isMute)=> !isMute);
  }

  return (
    <div className='flex flex-col w-11/12  p-7  m-2  inset-0' >

    {/* header */}
    <div className='flex md:flex-row flex-col items-center  justify-between w-11/12  max-w-[1260px] h-[59px] '>

    <button className=' flex items-center bg-none outline-none mt-[2rem]' onClick={()=>navigate(-1)}>
      <IoMdArrowDropleft/>
      All Voice Rooms
    </button>

     </div>

    {/* All clients */}
     <div className=' bg-[#1d1d1d]  mt-[4rem]   rounded-t-md min-h-[calc(100vh-205px)]  p-[2rem]'  >

     <div className='flex justify-between items-center'> 
        <div className= " font-bold">{roomTopic}</div>
        <div className=' flex items-center '>
          <button className=' bg-[#262626] ml-[2rem] flex items-center rounded-md  '> <HiHandRaised/> </button>

          <button className=' bg-[#262626] ml-[2rem] flex items-center rounded-md  gap-3 ' onClick={()=>navigate(-1)}>

           <ImExit/> Leave Quietly </button>
        </div>
      </div>
 
    {/* client list */}
    <div className=' mt-[2rem] flex items-center flex-wrap gap-[30px]'>
    {
        clients.map( (singleClient)=>{
          return (
      
          <div key={singleClient._id} className=' flex flex-col items-center '>

               <div  className=' bg-pink-200 w-[100px] h-[100px] rounded-[50%] relative'>

              {/* audio element of react to play audio-=> single client k lie ek audio Player hi render hoga */}
              {/* providing audio player instance and client id to know which user audio player it is */}
              {/* audio player ka instance lelia with client id taki pta chale kis client ka audio player  hai */}
              <audio  ref={ (instance)=>provideRef(instance,singleClient._id) }
                autoPlay ></audio>
                <img src={singleClient.avatar} className=' w-[100%] h-[100%] rounded-[50%] '/>

                {/* mute and un mute */}
                <button
                 onClick={()=> handleMuteClick(singleClient._id)} className=' absolute bottom-0 right-0 w-[30px]  h-[30px] p-[5px]'>

                    {singleClient.muted ? (<CiMicrophoneOff/>) : (<CiMicrophoneOn/>)}

                  </button>

              </div>



              <h4 className=' mt-[1rem] font-bold'>{singleClient.userName}</h4>

          </div>
          )
        })
      }
    </div>

     </div>

    </div>
  )
}

export default CreatedRoom