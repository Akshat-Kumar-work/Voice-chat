import React, { useState } from 'react'
import Card from "../shared/card"
import {BsFillArrowRightCircleFill} from "react-icons/bs"
import {BsTelephonePlus} from "react-icons/bs"
import TextInput from '../shared/TextInput'

const Phone = ({onNext}) => {

  const [phoneNumber , setPhoneNumber] = useState('');
  return (
    <div className=' flex justify-center items-center'> 

   

    <Card 

      headingLogo={BsTelephonePlus}
      heading={ "Enter your phone number"}
      btnText={"Next"} logo={<BsFillArrowRightCircleFill />}

      SecondlastText={"By entering your number, you're agreeing to our Terms of Service and Privacy Policy. Thanks!"}

      input={<TextInput value={phoneNumber} onChange={ (event)=>setPhoneNumber(event.target.value)}/>}
      onclick={onNext}
    />


 

    </div>
  )
}

export default Phone