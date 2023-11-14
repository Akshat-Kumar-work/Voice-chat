import React from 'react'
import {BsFillArrowRightCircleFill} from "react-icons/bs"
import Card from "../shared/card"
import { useState } from 'react'
import TextInput from '../shared/TextInput'


const Email = ({onNext}) => {
  const [email , setemail] = useState('');

  return (
    <div className=' flex justify-center items-center'> 

   

    <Card 
 
      heading={ "Enter your email"}
      btnText={"Next"} logo={<BsFillArrowRightCircleFill />}

      SecondlastText={"By entering your email, you're agreeing to our Terms of Service and Privacy Policy. Thanks!"}
      input={<TextInput value={email} onChange={ (event)=>setemail(event.target.value)}/>}
      onclick={onNext}
     
    />

    </div>
  )
}

export default Email