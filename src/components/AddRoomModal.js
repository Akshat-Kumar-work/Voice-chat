import React, { useState } from 'react'
import TextInput from "./shared/TextInput";
import { IoEarth } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { IoLockClosed } from "react-icons/io5";
import { createRoom } from '../services/apiOperations';

const AddRoomModal = ({setShowModal}) => {
    const [roomType , setRoom] = useState('open');  
    const [topic , setTopic] = useState('');  

    function CreateRoom(){
      if(!topic){
        return;
      }
      createRoom(roomType,topic);
        
    }

  return (
    <div className=' fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center'>

    <div className=' w-[50%] max-w-[500px] bg-[#333333] bg rounded-lg relative'>

    <button onClick={setShowModal} className=' absolute right-0'>Close</button>

    {/* header */}
        <div className=' p-[30px] border-b-[2px] space-y-2 '>
            <h3 className=' text-xl'>Enter the Topic</h3>
             <TextInput value={topic}  onChange={(e)=>setTopic(e.target.value)} />

             <div className=' p-3'>
                Room Type

                <div className=' flex md:flex-row flex-col justify-between mt-2'>

                <div onClick={()=>setRoom("open")}
                 className={`${roomType==='open'?" bg-black":""}  p-3 rounded-xl`}> 
                <IoEarth className='w-[40px] h-[40px]'/>
                <div>Open</div>
                </div>

                <div onClick={()=>setRoom("social")}
                 className={`${roomType==='social'?" bg-black":""}  p-3 rounded-xl`}> <IoIosPeople className='w-[40px] h-[40px]'/> 
                <div>Social</div> </div>

                <div onClick={()=>setRoom("closed")}
                 className={`${roomType==='closed'?" bg-black":""}  p-3 rounded-xl`}> <IoLockClosed className='w-[40px] h-[40px]'/>
                 <div>Closed</div> </div>


                </div>

             </div>
        </div>

    {/* Footer */}
        <div className=' flex md:flex-row flex-col  items-center justify-evenly p-3'>
            Start a room, open to everyone
            <button onClick={CreateRoom} className=' bg-green-600 rounded-lg p-3'>Let's Go</button>
        </div>
        

    </div>

    </div>
  )
}

export default AddRoomModal