import React, { useState } from 'react'
import Card from '../../components/shared/card'
import { useDispatch, useSelector } from 'react-redux'
import {BsFillArrowRightCircleFill } from "react-icons/bs";
import { IoLogoReddit } from "react-icons/io";
import {setAvatar} from '../../store/activateSlice'
import {activateUser} from '../../services/apiOperations';

const StepAvatar = ({onNext}) => {
  const {userName , avatar} = useSelector(state=>state.activate);
  const [img , setImg] = useState('/profile-img.jpg');
  const [imgString , setimgString] = useState('');
  const dispatch = useDispatch();

  function nextStep(){
    dispatch(activateUser(userName,imgString));
    //onNext();
  }

  function fileHandler(e){
    const file = e.target.files[0];
    console.log("img file",file)
    if(file){
      setimgString(file)
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function(){
      setImg(reader.result);
     dispatch( setAvatar(imgString))
    }
    console.log(file)
  }

  return (
                            <div className='flex justify-center items-center'>

                            <Card 

                           headingLogo={<IoLogoReddit />}
                                  heading={ `Hi' ${userName}!`}

                              para1={"How's this image?"}
                           
                              img = { <img src={img} alt='image' className=' rounded-full border-4 border-[#0077ff] w-[150px] '/>}
                              
                          


                             logo={<BsFillArrowRightCircleFill />}
                              onclick={nextStep}
                              btnText={"Next"}

                              input2={<div>
                                 <input id='imgAvatar' type='file' onChange={fileHandler} className='hidden'/>
                                <label htmlFor='imgAvatar' className=' text-blue-500'>Choose a different Picture!</label>
                              </div>}
                             
                              />


                             
                            
                         
                            </div>

  )
}

export default StepAvatar