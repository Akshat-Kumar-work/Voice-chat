import React, { useState } from 'react'
import { RiUserSearchLine } from "react-icons/ri";
import { MdAddIcCall } from "react-icons/md";
import RoomCard from '../components/RoomCard';
import AddRoomModal from '../components/AddRoomModal';

const rooms = [

  {
    id:1,
    topic: "Which framework best for fronend?",
    speakers:[
      {
        id:1,
        name:"akshat",
        avatar:"/profile-img.jpg"
      },
      {
        id:2,
        name:"himanshi",
        avatar:"/profile-img.jpg"
      }
    ],
    totalPeople:40
  },
  {
    id:2,
    topic: "Which framework best for fronend?",
    speakers:[
      {
        id:1,
        name:"akshat",
        avatar:"/profile-img.jpg"
      },
      {
        id:2,
        name:"himanshi",
        avatar:"/profile-img.jpg"
      }
    ],
    totalPeople:40
  },
  {
    id:3,
    topic: "Which framework best for fronend?",
    speakers:[
      {
        id:1,
        name:"akshat",
        avatar:"/profile-img.jpg"
      },
      {
        id:2,
        name:"himanshi",
        avatar:"/profile-img.jpg"
      }
    ],
    totalPeople:40
  },
  {
    id:4,
    topic: "Which framework best for fronend?",
    speakers:[
      {
        id:1,
        name:"akshat",
        avatar:"/profile-img.jpg"
      },
      {
        id:2,
        name:"himanshi",
        avatar:"/profile-img.jpg"
      }
    ],
    totalPeople:40
  },
  {
    id:5,
    topic: "Which framework best for fronend?",
    speakers:[
      {
        id:1,
        name:"akshat",
        avatar:"/profile-img.jpg"
      },
      {
        id:2,
        name:"himanshi",
        avatar:"/profile-img.jpg"
      }
    ],
    totalPeople:40
  },

]

const Rooms = () => {
  const [showModal , setShowModal] = useState(false);
  function openModal(){
    setShowModal(true);
  }
  return (
    <div className='flex flex-col w-11/12  p-7  m-2  inset-0'>

    {/* header */}
    <div className='flex md:flex-row flex-col items-center  justify-between w-11/12  max-w-[1260px] h-[59px] '>

    {/* left side */}
    <div className='flex  flex-col  p-3  pl-[80px]'>

      <div className='w-[10%px] '>All voice rooms</div>

      <div className='flex bg-[#121212] items-center border border-white min-w-[90%]  rounded-md '>
      <RiUserSearchLine/>
       <input type='text' className=' bg-transparent border-none outline-none p-[10px]' />

      </div>

    </div>

    {/* right side*/}
     <button onClick={openModal}  className='flex items-center space-x-2 bg-green-600 rounded-lg p-3 '>
     <MdAddIcCall/>
    <div> Start a Room</div>
     </button>


    </div>



    {/* room list  */}
    <div className='grid grid-cols-1 md:grid-cols-4 gap-5  p-8 md:m-8 md:mt-2  mt-12 items-center'>
    {
      rooms.map( (room)=>{
        return(
          <RoomCard key={room.id} room={room}/>
        )
      })
    }
    </div>

    {showModal && <AddRoomModal setShowModal={()=>setShowModal(false)}/>}

    </div>
  )
}

export default Rooms