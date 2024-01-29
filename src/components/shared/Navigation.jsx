import React from 'react'
import {MdOutlineKeyboardVoice} from "react-icons/md"
import { Link } from 'react-router-dom'
import {logoutUser} from '../../services/apiOperations';
import { useDispatch, useSelector } from 'react-redux';


const Navigation = () => {
  const dispatch = useDispatch();
  const {isAuth} = useSelector((state)=>state.auth);
  const {userName,avatar} = useSelector( (state)=>state.activate)
  function logout(){
    dispatch(logoutUser());
  }
  return (
    <div className=' flex  pt-5  bg-[#2f3238] items-center'  >  

    <nav className=' flex  pt-[2px] pb-[20px]  justify-between  w-11/12  max-w-[1260px]  '>
     
     <div></div>

     <div  >
      <Link to="/" className='flex md:flex-row flex-col items-center'>
      <MdOutlineKeyboardVoice className=' w-[30px] h-[40px] '/>
      <div> Voice Chat</div>
      </Link>

     </div>


    <div >
     

     <Link to="/" className='flex md:flex-row flex-col items-center space-x-2'> 
    { avatar? <img src={avatar} className=' w-[50px] h-[45px] object-cover rounded-full border-4 border-[#0077ff]'></img> : <> </>}
    <h3>{userName}</h3>
     </Link>

     </div>

     <div className=' items-center'>
 
    {isAuth ?<button onClick={logout}>Logout</button>: <></>}

    </div>

   
    </nav>

    </div>
  )
}

export default Navigation

