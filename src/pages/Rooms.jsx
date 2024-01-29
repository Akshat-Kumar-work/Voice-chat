import React from 'react'
import { RiUserSearchLine } from "react-icons/ri";
import { MdAddIcCall } from "react-icons/md";
import RoomCard from '../components/RoomCard';

const Rooms = () => {
  return (
    <div className='flex flex-col w-[90%]  h-full  p-7  m-2'>

    {/* header */}
    <div className='flex flex-row  justify-between  w-full '>

    {/* left side */}
    <div className='flex items-center space-x-4 '>
      <div className=''>All voice rooms</div>

      <div className='flex className= bg-[#121212] items-center border border-white min-w-[400px]  rounded-md '>
      <RiUserSearchLine/>

       <input type='text' className=' bg-transparent border-none outline-none p-[10px]' />
      </div>

    </div>

    {/* right side*/}
     <button  className='flex items-center space-x-2 bg-green-600 rounded-lg p-3'>
     <MdAddIcCall/>
    <div> Start a Room</div>
     </button>


    </div>



    {/* room list  */}
    <div>
    <RoomCard/>
    </div>



    </div>
  )
}

export default Rooms