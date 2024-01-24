import React, { useState } from 'react';
import Card from '../../components/shared/card';
import TextInput from '../../components/shared/TextInput';
import { FaRegFaceGrinWide } from "react-icons/fa6";
import {BsFillArrowRightCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../store/activateSlice';


const StepName = ({onNext}) => {
  const {userName} = useSelector(state=>state.activate)
  const [name , setname] = useState(userName);

  const dispatch = useDispatch();

  function nextStep(){
    if(!name){
      return;
    }
    dispatch(setName(name));
    onNext();

  }
  return (
   
 <div className='flex justify-center items-center'>

                              <Card 

                              headingLogo={<FaRegFaceGrinWide/>}
                                    heading={ "Enter your Full Name"}

                      
                              input={<TextInput value={name} onChange={ (event)=>setname(event.target.value)}/>}

                                logo={<BsFillArrowRightCircleFill />}

                                onclick={nextStep}


                                btnText={"Next"}

                                SecondlastText={"Few more Step's "}
                                />

 </div>
          




  )
}

export default StepName