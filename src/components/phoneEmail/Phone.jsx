import React from 'react'
import Card from "../shared/card"
import {BsFillArrowRightCircleFill} from "react-icons/bs"
import {BsTelephonePlus} from "react-icons/bs"

const Phone = () => {
  return (
    <div className=' flex justify-center items-center'> 

   

    <Card 
      headingLogo={BsTelephonePlus}
      heading={ "Enter your phone number"}
      btnText={"Next"} logo={<BsFillArrowRightCircleFill />}

      SecondlastText={"By entering your number, you're agreeing to our Terms of Service and Privacy Policy. Thanks!"}
     
    />

    </div>
  )
}

export default Phone