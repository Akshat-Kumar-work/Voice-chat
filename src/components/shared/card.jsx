import React from 'react'
import { Link } from 'react-router-dom'

const card = ({heading , para1 , para2 , btnText , SecondlastText , logo , lastText , onclick}) => {
  return (
    <div className=' mt-40 w-[50%] max-w-[1260px] max-width-[90%]  flex flex-col p-5  items-center justify-center  space-y-4 m-3  bg-gray-800 rounded-lg '>

    <div className='flex justify-center flex-col items-center'>
        <h1 className=' text-xl font-bold '> {heading} </h1>
        <p className=' text-blue-300'> {para1}</p>
       <p className=' text-blue-300'> {para2} </p> 
    </div>

    <div>
        <button onClick={onclick} className='flex flex-row bg-blue-500 rounded-full p-1 hover:bg-blue-700 '>
            <span className=' pr-2'>{btnText}</span>
            {logo}
        </button>
    </div>

    <div className='flex flex-col '>
        <span>{SecondlastText} </span>
        <Link  className=' text-blue-400 text-center' to="/login"> {lastText} </Link> 
    </div>

    </div>
  )
}

export default card