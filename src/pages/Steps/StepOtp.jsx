import React, { useState } from 'react'
import Card from '../../components/shared/card'
import {BsFillArrowRightCircleFill } from "react-icons/bs";
import { BiSolidLock } from "react-icons/bi";
import TextInput from '../../components/shared/TextInput';
import { verifyOtp } from '../../services/apiOperations';


const StepOtp = ({onNext}) => {

  const [otp , setOtp] = useState('');

  function onSubmit (){

    verifyOtp(otp);

    onNext();
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