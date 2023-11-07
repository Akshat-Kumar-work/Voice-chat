import React from 'react'

import { Link } from 'react-router-dom'
import {BsFillArrowRightCircleFill} from "react-icons/bs"
const home = () => {
  return (
    <div className=' flex justify-center items-center'> 

<div className=' mt-40 w-[50%] max-w-[1260px] max-width-[90%]  flex flex-col p-5  items-center justify-center  space-y-4 m-3  bg-gray-800 rounded-lg '>

<div className='flex justify-center flex-col items-center'>
    <h1 className=' text-xl font-bold '>Welcome to Voice-Chat</h1>
    <p className=' text-blue-300'> We are working hard to get voice-chat ready for everyone.</p>
   <p className=' text-blue-300'> While we wrap up the finishing touches, we are adding people gradually
    to make sure nothing breaks. </p> 
</div>

<div>
    <button className='flex flex-row bg-blue-500 rounded-full p-1'>
        <span className=' pr-2'>Get your username</span>
        <BsFillArrowRightCircleFill />
    </button>
</div>

<div className='flex flex-col '>
    <span>Have an invite text? </span>
    <Link  className=' text-blue-400 text-center' to="/login"> Sign in </Link> 
</div>

</div>
    </div>
  )
}

export default home