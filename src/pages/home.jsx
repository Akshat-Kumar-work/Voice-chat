import React from 'react'
import Card from '../components/shared/card'
import {BsFillArrowRightCircleFill} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const navigate = useNavigate();

  const onClick = ()=>{
    navigate("/authenticate");
  }

  return (
    <div className=' flex justify-center items-center'> 

    <Card heading={"Welcome to Voice-Chat"} para1={"We are working hard to get voice-chat ready for everyone!"}
      para2={"While we wrap up the finishing youches, we are adding people gradually to make sure nothing breaks:)"}
      btnText={"Let's Chat"} logo={<BsFillArrowRightCircleFill />}
      lastText={"Sign in"}
      SecondlastText={"Have an invite text?"}
      onclick={onClick}
    />

    </div>
  )
}

export default Home