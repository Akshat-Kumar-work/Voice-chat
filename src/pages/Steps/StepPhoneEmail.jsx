import React, { useState } from 'react'
import Phone from "../../components/phoneEmail/Phone"
import Email from "../../components/phoneEmail/Email"


const phoneEmailMap = {
  phone: Phone,
  email: Email
}

const StepPhoneEmail = ({onNext}) => {
  const [type , setType] = useState('phone');
  const Type = phoneEmailMap[type];

  function onNext(){
   
  }

  return(
    <>
      <button onClick={()=>{ setType('phone')}}>Phone</button>
      <button onClick={()=>{ setType('email')}}>email</button>
        <Type onNext={onNext}/>
    </>
  ) 
}

export default StepPhoneEmail