import React from 'react'
import {MdOutlineKeyboardVoice} from "react-icons/md"
import { Link } from 'react-router-dom'
import {logoutUser} from '../../services/apiOperations';
import { useDispatch, useSelector } from 'react-redux';


const Navigation = () => {
  const dispatch = useDispatch();
  const {isAuth} = useSelector((state)=>state.auth)
  function logout(){
    dispatch(logoutUser());
  }
  return (
    <div className=' flex justify-between pt-10 mt-40' >  

    <nav className=' flex flex-row  pt-[20px] pb-[20px] justify-evenly  w-[100%]'>
     <div>
      
     </div>
     
     <div>
      <Link to="/" >
      <MdOutlineKeyboardVoice className=' w-[30px] h-[30px] '/>
      </Link>
      Voice Chat

     </div>

    <div >
    {isAuth ?<button onClick={logout}>Logout</button>: <></>}
    </div>

   
    </nav>

    </div>
  )
}

export default Navigation

