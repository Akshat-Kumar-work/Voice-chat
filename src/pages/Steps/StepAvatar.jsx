import React, { useState } from 'react'
import Card from '../../components/shared/card'
import { useDispatch, useSelector } from 'react-redux'
import {BsFillArrowRightCircleFill } from "react-icons/bs";
import { IoLogoReddit } from "react-icons/io";
import {setAvatar} from '../../store/activateSlice'
import {activateUser} from '../../services/apiOperations';

const StepAvatar = ({onNext}) => {


  const {userName } = useSelector(state=>state.activate);
  const [previewImg , setPreviewImg] = useState('/profile-img.jpg');
  const [fileImg , setFileImg] = useState(null);
  const dispatch = useDispatch();

  function nextStep(){
    const formData = new FormData();
    formData.append("avatar",fileImg);

    dispatch(activateUser(formData , userName));
    //onNext();
  };


   

  function fileHandler(e){

    const file = e.target.files[0];
    if(file){
      setFileImg(file);

    }
    
      //reading file for preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function(){
      setPreviewImg(reader.result);
     dispatch( setAvatar(previewImg))
    }
    console.log(file)
  }

  return (
                            <div className='flex justify-center items-center'>

                            <Card 

                           headingLogo={<IoLogoReddit />}
                                  heading={ `Hi' ${userName}!`}

                              para1={"How's this image?"}
                           
                              img = { <img src={previewImg} alt='image' className=' rounded-full border-4 border-[#0077ff] w-[150px] '/>}
                              
                          


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