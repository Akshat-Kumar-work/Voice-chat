import React, { useState } from 'react'
import Phone from "../../components/phoneEmail/Phone"
import Email from "../../components/phoneEmail/Email"
import {BsTelephonePlus} from "react-icons/bs"
import {HiOutlineMail} from "react-icons/hi";


const phoneEmailMap = {
  phone: Phone,
  email: Email
}

const StepPhoneEmail = ({onNext}) => {

  
  const [type , setType] = useState('email');
  const Type = phoneEmailMap[type];



  return(
    <>

    <div className='flex items-center justify-center  mt-7 '>

         <div >

         <div className=' space-x-5 flex   items-center justify-center'>

            <button className= {`${ type === "phone" ? " bg-blue-500":"" } w-[50px] h-[50px] rounded-lg`} 
            onClick={()=>{ setType('phone')}}><BsTelephonePlus className='w-[50px] h-[18px]'/></button>

            <button className= {`${ type === "email" ? " bg-blue-500":"" } w-[50px] h-[50px] rounded-lg`}
             onClick={()=>{ setType('email')}}> <HiOutlineMail className='w-[50px] h-[18px]'/> </button>

        </div>

        <Type onNext={onNext}/>
        

         </div>



    </div>

     
    </>
  ) 
}

export default StepPhoneEmail