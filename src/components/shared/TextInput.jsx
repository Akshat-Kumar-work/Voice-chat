import React from 'react'

const TextInput = (props) => {
  return (
    <div >
        <input className=' w-[98%] h-[36px] bg-[#454545]  rounded-lg ' type='text' {...props}/>
    </div>
  )
}

export default TextInput