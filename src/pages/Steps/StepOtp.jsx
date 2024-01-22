import React, { useState } from 'react'
import Card from '../../components/shared/card'
import {BsFillArrowRightCircleFill } from "react-icons/bs";
import { BiSolidLock } from "react-icons/bi";
import TextInput from '../../components/shared/TextInput';
import { verifyOtp } from '../../services/apiOperations';
import { useDispatch,useSelector } from 'react-redux';

const StepOtp = () => {
  const email = useSelector( (state)=>state.auth.email);
  const dispatch = useDispatch();
  const [otp , setOtp] = useState('');

  function onSubmit (){

    dispatch( verifyOtp(otp , email))

  }


  return (
    <div className=' flex justify-center items-center'> 

   

    <Card 

      headingLogo={<BiSolidLock />}
      heading={ "Enter the code we just texted you"}
     

      btnText={"Next"}
      logo={<BsFillArrowRightCircleFill />}

      onclick={onSubmit}

      input={<TextInput  value={otp} onChange={ (event)=>setOtp(event.target.value)} />}
      lastText={"Didn't receive? Tap to resend !"}
    />
    
  

 

    </div>
  )
}

export default StepOtp