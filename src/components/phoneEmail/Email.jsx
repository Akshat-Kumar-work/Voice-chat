import React from 'react'
import {BsFillArrowRightCircleFill} from "react-icons/bs"
import Card from "../shared/card"


const Email = () => {
  return (
    <div className=' flex justify-center items-center'> 

   

    <Card 
 
      heading={ "Enter your email"}
      btnText={"Next"} logo={<BsFillArrowRightCircleFill />}

      SecondlastText={"By entering your email, you're agreeing to our Terms of Service and Privacy Policy. Thanks!"}
     
    />

    </div>
  )
}

export default Email