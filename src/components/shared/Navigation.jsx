import React from 'react'
import {MdOutlineKeyboardVoice} from "react-icons/md"
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className=' flex justify-between pt-10' >  

    <nav className=' flex flex-row  pt-[20px] pb-[20px]  justify-center w-[100%]'>
      <Link to="/" >
        <MdOutlineKeyboardVoice className=' w-[30px] h-[30px] '/>
      </Link>
     
     <div>
      Voice Chat
     </div>

   
    </nav>
    </div>
  )
}

export default Navigation

