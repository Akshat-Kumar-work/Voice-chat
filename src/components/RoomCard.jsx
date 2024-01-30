import React from 'react'
import { IoIosPeople } from "react-icons/io";
import { TfiThought } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';

const RoomCard = ({room}) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/room/:${room._id}`)}
    className=' bg-[#1d1d1d] space-y-2 p-[20px]  mt-4  rounded-xl'>

      <div>{room.topic}</div>
      
      {/* speakers */}
     <div className={ room.speakers.length === 1 ? " flex flex-col justify-between items-center space-y-2 ": ` flex md:flex-row flex-col justify-between items-center `}>

       {/* img */}
       <div className=' mt-2  rounded-full'>
      {room.speakers.map( (singlePerson)=>{
          return(       
            <img key={singlePerson._id} src={singlePerson.avatar} className=' rounded-full w-[50px] border-[3px]  border-[#20bd5f]'/>     
          )
        })}
      </div>

      {/* name */}
      <div className=' items-center space-x-1 space-y-2'>
      {room.speakers.map( (singlePerson)=>{
          return(   
            <div key={singlePerson._id} className='flex '>
            <TfiThought/> {singlePerson.userName} 
            </div>
             
           
          )
        })}
      </div>

     </div>

     <div className='flex items-center '>
     <IoIosPeople/>
     {room.totalPeople}
     </div>


    </div>
  )
}

export default RoomCard